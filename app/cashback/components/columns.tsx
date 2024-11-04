'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Cashback } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Cashback>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
		meta: 'ID',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-fit truncate text-ellipsis font-medium">
						{row.original.id}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'transaction.id',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction ID" />,
		meta: 'Transaction ID',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-fit truncate text-ellipsis font-medium">
						{row.original?.transaction?.id}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'username',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
		meta: 'Username',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-fit truncate text-ellipsis font-medium">
						{row.original?.transaction?.user?.username}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
		meta: 'Amount',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-fit truncate text-ellipsis font-medium">
						{row.original?.amount?.toLocaleString() + ' đ'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'earnedAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Earned date" />,
		meta: 'Earned date',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-fit truncate text-ellipsis font-medium">
						{row.original.earnedAt?.toLocaleDateString() ?? 'Unknown'}
					</span>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
