export default function ResponsiveTable({ columns, rows, keyField = "id", emptyMessage = "No data available" }) {

    if (!rows || rows.length === 0) {
        return (
            <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-10 text-center text-neutral-500 dark:text-neutral-400">
                {emptyMessage}
            </div>
        )
    }

    return (
        <>
            <div className="hidden md:block bg-white dark:bg-neutral-900 rounded-card shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-primary-700 text-white">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} className="text-left py-4 px-6 text-sm font-semibold whitespace-nowrap">
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row[keyField]} className="border-b border-neutral-100 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key} className="py-4 px-6 text-sm text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="md:hidden space-y-3">
                {rows.map((row) => (
                    <div key={row[keyField]} className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-4">
                        {columns.map((col) => (
                            <div key={col.key} className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{col.label}</span>
                                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100 text-right">
                                    {col.render ? col.render(row) : row[col.key]}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
