'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Boxes, AlertTriangle, PackageCheck, Plus, Pencil, Trash2, X, Check, Inbox,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const emptyForm = { sku: '', name: '', quantity: '', warehouse: '', unitPrice: '', status: 'IN_STOCK' };

const statusLabels = { IN_STOCK: 'In Stock', LOW_STOCK: 'Low Stock', OUT_OF_STOCK: 'Out of Stock' };
const statusStyles = {
  IN_STOCK: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  LOW_STOCK: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',
  OUT_OF_STOCK: 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400',
};

export default function InventoryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [query, setQuery] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadRows = async (q = '') => {
    setLoading(true);
    setListError('');
    try {
      const response = await fetch(`/api/inventory?limit=100${q ? `&q=${encodeURIComponent(q)}` : ''}`, {
        credentials: 'include',
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to load inventory.');
      setRows(json.data.items);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => loadRows(query), 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const stats = useMemo(() => {
    const total = rows.length;
    const low = rows.filter((r) => r.status === 'LOW_STOCK').length;
    const inStockPct = total ? Math.round((rows.filter((r) => r.status === 'IN_STOCK').length / total) * 1000) / 10 : 0;
    return [
      { label: 'Total SKUs', value: total, icon: Boxes },
      { label: 'Low Stock Alerts', value: low, icon: AlertTriangle },
      { label: 'In Stock', value: `${inStockPct}%`, icon: PackageCheck },
    ];
  }, [rows]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingId(row.id);
    setForm({
      sku: row.sku,
      name: row.name,
      quantity: String(row.quantity),
      warehouse: row.warehouse || '',
      unitPrice: row.unitPrice != null ? String(row.unitPrice) : '',
      status: row.status,
    });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const validate = () => {
    const next = {};
    if (!form.sku.trim()) next.sku = 'SKU is required.';
    if (!form.name.trim()) next.name = 'Item name is required.';
    if (form.quantity === '' || Number(form.quantity) < 0) next.quantity = 'Enter a valid quantity.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      quantity: Number(form.quantity),
      warehouse: form.warehouse.trim() || undefined,
      unitPrice: form.unitPrice === '' ? undefined : Number(form.unitPrice),
      status: form.status,
    };

    try {
      setSaving(true);
      const response = await fetch(editingId ? `/api/inventory/${editingId}` : '/api/inventory', {
        method: editingId ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok) {
        setErrors({ sku: json.message || 'Failed to save item.' });
        return;
      }
      await loadRows(query);
      closeModal();
    } catch (err) {
      setErrors({ sku: 'Something went wrong. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/inventory/${deleteTarget.id}`, { method: 'DELETE', credentials: 'include' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to delete item.');
      setRows((r) => r.filter((row) => row.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Track stock levels across all warehouses in real time."
        actions={
          <Button size="sm" className="gap-2" onClick={openAddModal}>
            <Plus className="w-4 h-4" /> Add Item
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Stock Overview</h3>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search SKU or item..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {listError && <p className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-4 py-3">{listError}</p>}

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-gray-200/70 dark:border-white/10">
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">SKU</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Item</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Quantity</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Warehouse</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Status</th>
                <th className="text-center font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500">Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                        <Inbox className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {query ? 'No items match your search' : 'No inventory items yet'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-blue-50/30 dark:hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.sku}</td>
                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.name}</td>
                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.quantity}</td>
                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.warehouse || '—'}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
                        {statusLabels[row.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(row)} className="p-2 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 hover:scale-105 transition-all duration-200" aria-label={`Edit ${row.sku}`}>
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(row)} className="p-2 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10 hover:scale-105 transition-all duration-200" aria-label={`Delete ${row.sku}`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={closeModal}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0a0f1f] border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-7">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">{editingId ? 'Edit Item' : 'Add Item'}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{editingId ? 'Update this inventory item.' : 'Create a new inventory item.'}</p>
                </div>
                <button onClick={closeModal} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">SKU</label>
                    <Input placeholder="XL-1001" value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} className={errors.sku ? '!border-red-400 dark:!border-red-500/60' : ''} autoFocus />
                    {errors.sku && <p className="mt-1.5 text-xs text-red-500">{errors.sku}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Quantity</label>
                    <Input type="number" min="0" placeholder="0" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} className={errors.quantity ? '!border-red-400 dark:!border-red-500/60' : ''} />
                    {errors.quantity && <p className="mt-1.5 text-xs text-red-500">{errors.quantity}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Item Name</label>
                  <Input placeholder="Steel Bracket 20mm" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={errors.name ? '!border-red-400 dark:!border-red-500/60' : ''} />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Warehouse</label>
                    <Input placeholder="Warehouse A" value={form.warehouse} onChange={(e) => setForm((f) => ({ ...f, warehouse: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Unit Price</label>
                    <Input type="number" min="0" step="0.01" placeholder="0.00" value={form.unitPrice} onChange={(e) => setForm((f) => ({ ...f, unitPrice: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                    <option value="IN_STOCK" className="bg-white text-black">In Stock</option>
                    <option value="LOW_STOCK" className="bg-white text-black">Low Stock</option>
                    <option value="OUT_OF_STOCK" className="bg-white text-black">Out of Stock</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" size="sm" className="gap-2" disabled={saving}>
                    <Check className="w-4 h-4" /> {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Item'}
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={closeModal} disabled={saving}>Cancel</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={() => !deleting && setDeleteTarget(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#0a0f1f] border border-black/10 dark:border-white/10 shadow-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Delete this item?</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{deleteTarget.sku}</span> — {deleteTarget.name}. This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <Button size="sm" onClick={confirmDelete} disabled={deleting} className="!bg-none !bg-red-600 hover:!bg-red-700 !shadow-none">{deleting ? 'Deleting...' : 'Delete'}</Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
