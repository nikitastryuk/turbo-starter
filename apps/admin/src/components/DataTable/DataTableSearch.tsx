import type { Table } from '@tanstack/react-table';

import { Input } from '@llmaid/system';

interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({ table }: DataTableSearchProps<TData>) {
  return (
    <div className="mb-2 flex items-center">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
