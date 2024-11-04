'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Group } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Group>[] = [
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
		accessorKey: 'owner',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Owner" />,
		meta: "Owner",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.owner.name}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'walletBalance',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Wallet Balance" />,
		meta: "Wallet Balance",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.walletBalance?.toLocaleString('vi-VN') + ' đ'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
		meta: "Created At",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.createdAt?.toLocaleDateString()}
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
