'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AffiliateProgram } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<AffiliateProgram>[] = [
	{
		accessorKey: 'logo',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Logo" />,
		meta: 'Logo',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<img
						src={row.original.logo || 'https://placehold.co/100x100?text=No%20image'}
						alt="Program Logo"
						className="h-[100px] w-[100px] object-contain"
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'programName',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Program name" />,
		meta: 'Program name',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] font-medium">{row.getValue('programName')}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'commissionRate',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Commission Rate" />,
		meta: 'Commission Rate',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] text-ellipsis font-medium line-clamp-3">
						<div dangerouslySetInnerHTML={{ __html: row.getValue('commissionRate') }} />
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'terms',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Terms" />,
		meta: 'Terms',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate text-ellipsis line-clamp-3 font-medium">
						<div dangerouslySetInnerHTML={{ __html: row.getValue('terms') }} />
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'validFrom',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Valid time" />,
		meta: 'Valid time',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-fit truncate text-ellipsis font-medium">
						{row.original.validFrom?.toLocaleDateString()} -{' '}
						{row.original.validUntil?.toLocaleDateString() ?? "Unknown"}
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
