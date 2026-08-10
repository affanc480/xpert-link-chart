'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Trash2,
  Check,
  X,
  Lock,
  AlertTriangle,
  FileSpreadsheet,
  Loader2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// ---------------------------------------------------------------------------
// HOW MANY BLANK ROWS TO SHOW BELOW THE REAL DATA
// ---------------------------------------------------------------------------
// This is the number you asked about. When the grid is empty (or you've
// filled every blank row), this many empty, ready-to-type rows are always
// kept at the bottom — like opening a fresh sheet in Excel. Bump it up if
// you're usually pasting 15-20 lines at once, or down if 8 feels like too
// much scrolling. Paste will still auto-add more rows beyond this number
// if you paste more lines than are currently visible.
const EMPTY_ROW_COUNT = 8;
// ---------------------------------------------------------------------------

let tempKeyCounter = 0;
const makeBlankRow = () => ({
  key: `tmp-${tempKeyCounter++}`,
  code: '',
  description: '',
  mainAccountId: '',
  errors: {},
  saving: false,
});

/**
 * Shared table manager for "Code / Description" style reference tables.
 * Used by both the Chart of Account Main and Chart of Account General
 * pages. Renders as an Excel-style grid:
 *
 *  - EMPTY_ROW_COUNT blank rows are always kept at the bottom, ready to
 *    type or paste into directly (no "Add New" click needed to get started).
 *  - Pasting multi-line / tab-separated data (e.g. copied from Excel or a
 *    text file) splits automatically across the right rows and columns,
 *    spilling into extra rows as needed.
 *  - A row saves itself automatically once its required cells are filled
 *    (on Tab/Enter/blur out of the row) — no separate "save" click needed.
 *  - Once a row is saved, its Code cell is permanently locked (both here
 *    and re-enforced server-side) — only Description / Main Account can be
 *    edited afterwards, and it can only be removed via Delete.
 */
export function AccountCodeManager({ apiPath, icon: Icon = FileSpreadsheet, requireMainAccount = false }) {
  const [rows, setRows] = useState([]);
  const [mainAccounts, setMainAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [listError, setListError] = useState('');

  // The always-present blank rows at the bottom of the grid, ready to type
  // or paste into. Each one autosaves itself once it has enough data.
  const [templateRows, setTemplateRows] = useState(() =>
    Array.from({ length: EMPTY_ROW_COUNT }, makeBlankRow)
  );

  // Which single cell of an existing (saved) row is currently in edit mode.
  const [editingCell, setEditingCell] = useState(null); // { id, field }
  const [editValue, setEditValue] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const editInputRef = useRef(null);
  const tableContainerRef = useRef(null);

  // Column order used for pasted-data mapping (code -> description -> main account).
  const columns = requireMainAccount ? ['code', 'description', 'mainAccountId'] : ['code', 'description'];

  const loadRows = async () => {
    setLoading(true);
    setListError('');
    try {
      const response = await fetch(`${apiPath}?limit=100`, { credentials: 'include' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to load records.');
      setRows(json.data.items);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
    if (requireMainAccount) {
      fetch('/api/chart-of-account-main?limit=100', { credentials: 'include' })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setMainAccounts(json.data.items);
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPath]);

  useEffect(() => {
    if (editingCell) editInputRef.current?.focus();
  }, [editingCell]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) => r.code.toLowerCase().includes(q) || r.title.toLowerCase().includes(q)
    );
  }, [rows, search]);

  // ---------- Blank/template rows: typing, pasting, autosave ----------

  const addBlankRow = () => {
    setTemplateRows((prev) => [...prev, makeBlankRow()]);
  };

  const updateTemplateCell = (key, field, value) => {
    setTemplateRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, [field]: value, errors: {} } : r))
    );
  };

  const clearTemplateRow = (key) => {
    setTemplateRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, code: '', description: '', mainAccountId: '', errors: {} } : r))
    );
  };

  // Tab/Enter both just move focus to the next input in DOM order (native
  // browser tab order already goes code -> description -> main account ->
  // next row's code, since that's the layout order). Enter doesn't do this
  // natively, so we do it by hand. Escape clears whatever's been typed in
  // that row so far.
  const focusNextField = (currentEl) => {
    if (!tableContainerRef.current) return;
    const focusable = Array.from(tableContainerRef.current.querySelectorAll('input, select'));
    const idx = focusable.indexOf(currentEl);
    if (idx !== -1 && idx + 1 < focusable.length) focusable[idx + 1].focus();
  };

  const handleTemplateKeyDown = (e, rowKey) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusNextField(e.currentTarget);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      clearTemplateRow(rowKey);
      e.currentTarget.blur();
    }
  };

  // Saves a template row once it has everything required. Safe to call on
  // every blur/Enter — it's a no-op until the row is actually complete.
  const trySaveTemplateRow = (rowKey) => {
    setTemplateRows((prev) => {
      const row = prev.find((r) => r.key === rowKey);
      if (!row || row.saving) return prev;
      const code = row.code.trim();
      const description = row.description.trim();
      if (!code || !description) return prev;
      if (requireMainAccount && !row.mainAccountId) return prev;

      saveTemplateRowAsync({ ...row, code, description });
      return prev.map((r) => (r.key === rowKey ? { ...r, saving: true, errors: {} } : r));
    });
  };

  const saveTemplateRowAsync = async (row) => {
    const payload = {
      code: row.code,
      title: row.description,
      ...(requireMainAccount ? { mainAccountId: row.mainAccountId } : {}),
    };
    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok) {
        setTemplateRows((prev) =>
          prev.map((r) =>
            r.key === row.key ? { ...r, saving: false, errors: { code: json.message || 'Failed to save.' } } : r
          )
        );
        return;
      }
      setRows((rs) => [json.data, ...rs]);
      setTemplateRows((prev) => {
        const withoutSaved = prev.filter((r) => r.key !== row.key);
        // keep EMPTY_ROW_COUNT blank rows trailing at all times
        return withoutSaved.length < EMPTY_ROW_COUNT ? [...withoutSaved, makeBlankRow()] : withoutSaved;
      });
    } catch (err) {
      setTemplateRows((prev) =>
        prev.map((r) =>
          r.key === row.key ? { ...r, saving: false, errors: { code: 'Something went wrong. Please try again.' } } : r
        )
      );
    }
  };

  // Excel-style paste: newlines become new rows, tabs become new columns,
  // starting from whichever cell you pasted into. Spills into extra blank
  // rows automatically if you paste more lines than are currently shown.
  const handleTemplatePaste = (e, rowKey, field) => {
    const text = e.clipboardData?.getData('text') ?? '';
    if (!text || (!text.includes('\n') && !text.includes('\t'))) return; // single value, let normal paste happen
    e.preventDefault();

    const lines = text.replace(/\r/g, '').split('\n');
    while (lines.length && lines[lines.length - 1] === '') lines.pop();
    const startColIndex = columns.indexOf(field);

    setTemplateRows((prev) => {
      const next = [...prev];
      const startRowIndex = next.findIndex((r) => r.key === rowKey);
      if (startRowIndex === -1) return prev;

      const keysToTrySave = [];

      lines.forEach((line, li) => {
        const cells = line.split('\t');
        const targetRowIndex = startRowIndex + li;
        while (targetRowIndex >= next.length) next.push(makeBlankRow());

        const updatedRow = { ...next[targetRowIndex], errors: {} };
        cells.forEach((cellVal, ci) => {
          const colIdx = startColIndex + ci;
          if (colIdx >= columns.length) return;
          const colField = columns[colIdx];
          const trimmed = cellVal.trim();
          if (colField === 'mainAccountId') {
            const match = mainAccounts.find(
              (m) => m.code.toLowerCase() === trimmed.toLowerCase() || m.title.toLowerCase() === trimmed.toLowerCase()
            );
            if (match) updatedRow.mainAccountId = match.id;
          } else {
            updatedRow[colField] = trimmed;
          }
        });
        next[targetRowIndex] = updatedRow;
        keysToTrySave.push(updatedRow.key);
      });

      while (next.length < EMPTY_ROW_COUNT) next.push(makeBlankRow());

      // let this state update land, then attempt to autosave any rows
      // that are now fully filled in
      setTimeout(() => keysToTrySave.forEach((k) => trySaveTemplateRow(k)), 0);

      return next;
    });
  };

  // ---------- Edit a single cell on an existing (already-saved) row ----------

  const startEdit = (row, field, currentValue) => {
    setEditingCell({ id: row.id, field });
    setEditValue(currentValue ?? '');
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
    setEditError('');
  };

  const commitEdit = async (overrideValue) => {
    if (!editingCell) return;
    const { id, field } = editingCell;
    const value = overrideValue !== undefined ? overrideValue : editValue;
    const row = rows.find((r) => r.id === id);
    if (!row) return cancelEdit();

    const originalValue = field === 'description' ? row.title : row.mainAccountId || '';
    if (value === originalValue) return cancelEdit();

    if (field === 'description' && !value.trim()) {
      return cancelEdit(); // don't save a blank description, just revert
    }

    const payload = field === 'description' ? { title: value.trim() } : { mainAccountId: value };

    try {
      setEditSaving(true);
      const response = await fetch(`${apiPath}/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok) {
        setEditError(json.message || 'Failed to save.');
        return;
      }
      setRows((rs) => rs.map((r) => (r.id === id ? json.data : r)));
      cancelEdit();
    } catch (err) {
      setEditError('Failed to save.');
    } finally {
      setEditSaving(false);
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commitEdit();
    }
  };

  // ---------- Delete ----------

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const response = await fetch(`${apiPath}/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to delete record.');
      setRows((r) => r.filter((row) => row.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const cellBase =
    'border border-gray-200 dark:border-white/10 px-3 py-2.5 align-middle';
  const editableCellBase = `${cellBase} cursor-text hover:bg-blue-50/60 dark:hover:bg-white/[0.06] transition-colors`;
  const inlineInputClass =
    'w-full bg-white dark:bg-[#0a0f1f] border border-blue-500 rounded px-2 py-1 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30';
  const templateInputClass =
    'w-full bg-transparent border border-transparent hover:border-gray-300 dark:hover:border-white/20 focus:!border-blue-500 focus:bg-white dark:focus:bg-[#0a0f1f] rounded px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors';

  return (
    <>
      <Card className="!p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 p-5 sm:p-6 border-b border-gray-200/70 dark:border-white/10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search code or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button size="sm" onClick={addBlankRow} className="gap-2 flex-shrink-0">
            <Plus className="w-4 h-4" /> Add Row
          </Button>
        </div>

        {listError && (
          <p className="px-5 sm:px-6 py-3 text-sm text-red-500 bg-red-50 dark:bg-red-500/10">{listError}</p>
        )}

        {/* Excel-style grid */}
        <div ref={tableContainerRef} className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-white/[0.04] backdrop-blur-md">
              <tr>
                <th className={`${cellBase} text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs whitespace-nowrap w-36`}>
                  Code
                </th>
                <th className={`${cellBase} text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs whitespace-nowrap`}>
                  Description
                </th>
                {requireMainAccount && (
                  <th className={`${cellBase} text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs whitespace-nowrap`}>
                    Main Account
                  </th>
                )}
                <th className={`${cellBase} text-center font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs whitespace-nowrap w-24`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className={cellBase}>
                      <div className="h-4 w-16 rounded bg-black/[0.06] dark:bg-white/[0.08] animate-pulse" />
                    </td>
                    <td className={cellBase}>
                      <div className="h-4 w-40 rounded bg-black/[0.06] dark:bg-white/[0.08] animate-pulse" />
                    </td>
                    {requireMainAccount && (
                      <td className={cellBase}>
                        <div className="h-4 w-32 rounded bg-black/[0.06] dark:bg-white/[0.08] animate-pulse" />
                      </td>
                    )}
                    <td className={cellBase}>
                      <div className="h-4 w-10 mx-auto rounded bg-black/[0.06] dark:bg-white/[0.08] animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {search && filtered.length === 0 && (
                    <tr>
                      <td colSpan={requireMainAccount ? 4 : 3} className={`${cellBase} py-6 text-center text-sm text-gray-400 dark:text-gray-500`}>
                        No records match &quot;{search}&quot;.
                      </td>
                    </tr>
                  )}

                  {filtered.map((row, i) => {
                    const isEditingDesc = editingCell?.id === row.id && editingCell?.field === 'description';
                    const isEditingMain = editingCell?.id === row.id && editingCell?.field === 'mainAccountId';
                    return (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: Math.min(i, 6) * 0.015 }}
                        className="hover:bg-blue-50/30 dark:hover:bg-white/[0.03] transition-colors"
                      >
                        <td
                          className={`${cellBase} cursor-not-allowed select-none`}
                          title="Code is locked and cannot be changed once created"
                        >
                          <span className="inline-flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white">
                            <Icon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                            {row.code}
                            <Lock className="w-3 h-3 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                          </span>
                        </td>

                        <td
                          className={isEditingDesc ? cellBase : editableCellBase}
                          onClick={() => !isEditingDesc && startEdit(row, 'description', row.title)}
                        >
                          {isEditingDesc ? (
                            <>
                              <input
                                ref={editInputRef}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleEditKeyDown}
                                onBlur={() => commitEdit()}
                                disabled={editSaving}
                                className={inlineInputClass}
                              />
                              {editError && <p className="mt-1 text-[11px] text-red-500">{editError}</p>}
                            </>
                          ) : (
                            <span className="text-gray-600 dark:text-gray-300">{row.title}</span>
                          )}
                        </td>

                        {requireMainAccount && (
                          <td
                            className={isEditingMain ? cellBase : editableCellBase}
                            onClick={() =>
                              !isEditingMain && startEdit(row, 'mainAccountId', row.mainAccountId || '')
                            }
                          >
                            {isEditingMain ? (
                              <select
                                ref={editInputRef}
                                value={editValue}
                                onChange={(e) => {
                                  setEditValue(e.target.value);
                                  commitEdit(e.target.value);
                                }}
                                onKeyDown={handleEditKeyDown}
                                onBlur={() => commitEdit()}
                                disabled={editSaving}
                                className={inlineInputClass}
                              >
                                <option value="" className="bg-white text-black">Select...</option>
                                {mainAccounts.map((m) => (
                                  <option key={m.id} value={m.id} className="bg-white text-black">
                                    {m.code} — {m.title}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400">
                                {row.mainAccount ? `${row.mainAccount.code} — ${row.mainAccount.title}` : '—'}
                              </span>
                            )}
                          </td>
                        )}

                        <td className={cellBase}>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => setDeleteTarget(row)}
                              className="p-2 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10 hover:scale-105 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-200"
                              aria-label={`Delete ${row.code}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}

                  {!search &&
                    templateRows.map((row) => (
                      <tr key={row.key} className="bg-gray-50/50 dark:bg-white/[0.02]">
                        <td className={cellBase}>
                          <input
                            value={row.code}
                            onChange={(e) => updateTemplateCell(row.key, 'code', e.target.value)}
                            onKeyDown={(e) => handleTemplateKeyDown(e, row.key)}
                            onPaste={(e) => handleTemplatePaste(e, row.key, 'code')}
                            onBlur={() => trySaveTemplateRow(row.key)}
                            placeholder="e.g. 1000"
                            disabled={row.saving}
                            className={`${templateInputClass} ${row.errors.code ? '!border-red-400' : ''}`}
                          />
                          {row.errors.code && <p className="mt-1 text-[11px] text-red-500">{row.errors.code}</p>}
                        </td>
                        <td className={cellBase}>
                          <input
                            value={row.description}
                            onChange={(e) => updateTemplateCell(row.key, 'description', e.target.value)}
                            onKeyDown={(e) => handleTemplateKeyDown(e, row.key)}
                            onPaste={(e) => handleTemplatePaste(e, row.key, 'description')}
                            onBlur={() => trySaveTemplateRow(row.key)}
                            placeholder="e.g. Assets"
                            disabled={row.saving}
                            className={templateInputClass}
                          />
                        </td>
                        {requireMainAccount && (
                          <td className={cellBase}>
                            <select
                              value={row.mainAccountId}
                              onChange={(e) => {
                                updateTemplateCell(row.key, 'mainAccountId', e.target.value);
                                setTimeout(() => trySaveTemplateRow(row.key), 0);
                              }}
                              onKeyDown={(e) => handleTemplateKeyDown(e, row.key)}
                              onPaste={(e) => handleTemplatePaste(e, row.key, 'mainAccountId')}
                              onBlur={() => trySaveTemplateRow(row.key)}
                              disabled={row.saving}
                              className={templateInputClass}
                            >
                              <option value="" className="bg-white text-black">Select...</option>
                              {mainAccounts.map((m) => (
                                <option key={m.id} value={m.id} className="bg-white text-black">
                                  {m.code} — {m.title}
                                </option>
                              ))}
                            </select>
                          </td>
                        )}
                        <td className={cellBase}>
                          <div className="flex items-center justify-center">
                            {row.saving && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <p className="px-5 sm:px-6 py-3 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200/70 dark:border-white/10">
            Type or paste directly into the blank rows — they save automatically once a row is complete.
            Paste multi-line data and it'll spread across rows and columns on its own. Code locks once a row is
            saved — click Description{requireMainAccount ? ' or Main Account' : ''} on a saved row to edit it, or
            delete the row to remove it.
          </p>
        )}
      </Card>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => !deleting && setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#0a0f1f] border border-black/10 dark:border-white/10 shadow-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Delete this record?</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{deleteTarget.code}</span> —{' '}
                {deleteTarget.title}. This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <Button
                  size="sm"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="!bg-none !bg-red-600 hover:!bg-red-700 !shadow-none"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
