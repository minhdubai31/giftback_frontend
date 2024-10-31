'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Notification } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<Notification>[] = [
	{
		accessorKey: 'message',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Message" />,
		meta: "Message",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">{row.original.message}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'seen',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Seen" />,
		meta: "Seen",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.seen}
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
	}
];
