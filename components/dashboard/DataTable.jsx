'use client';

export function DataTable({ columns, rows, emptyLabel = 'No records yet' }) {
  return (
    <div className="glass rounded-2xl card-shadow overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-gray-200/70 dark:border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-blue-50/30 dark:hover:bg-white/[0.03] transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
