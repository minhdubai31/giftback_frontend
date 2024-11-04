'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Transaction } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
		meta: 'ID',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">{row.getValue('id')}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'user',
		header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
		meta: 'User',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.original.user?.username || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'program',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Program" />,
		meta: 'Program',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.original.program?.programName || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'totalAmount',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Total Amount" />,
		meta: 'Total Amount',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate text-ellipsis font-medium">
						{row.getValue('totalAmount') !== null ? row.getValue('totalAmount') : 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'cashbackAmount',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Cashback Amount" />,
		meta: 'Cashback Amount',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate text-ellipsis font-medium">
						{row.getValue('cashbackAmount') !== null
							? row.getValue('cashbackAmount')
							: 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'transactionDate',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction Date" />,
		meta: 'Transaction Date',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[150px] truncate text-ellipsis font-medium">
						{row.getValue('transactionDate')
							? new Date(row.getValue('transactionDate')).toLocaleDateString()
							: 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'productInformation',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Product information" />
		),
		meta: 'Product information',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[150px] truncate text-ellipsis font-medium">
						<span>{row.original.productName}</span>
						<img
							src={
								row.original.productImage ||
								'https://placehold.co/50x50?text=No%20image'
							}
							alt={row.original.productName || ''}
						/>
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
