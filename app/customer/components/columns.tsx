'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Customer } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Customer>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
		meta: "ID",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">{row.original.id}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'username',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
		meta: "Username",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.username}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		meta: "Name",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">{row.original.name}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'authProvider',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Auth Provider" />,
		meta: "Auth Provider",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.authProvider}
					</span>
				</div>
			);
		},
	},
  	{
		accessorKey: 'wallet.balance',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Wallet balance" />,
		meta: "Wallet balance",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.wallet?.balance?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', currencyDisplay: 'symbol' }).replace('₫', 'đ')}
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
