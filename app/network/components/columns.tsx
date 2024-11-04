'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { labels, statuses } from '../data/data';
import { AffiliateNetwork } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<AffiliateNetwork>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Network name" />,
		meta: 'Network name',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('name')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'url',
		header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
		meta: 'URL',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('url')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'authorizeToken',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Token" />,
		meta: 'Token',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate text-ellipsis font-medium">
						{row.getValue('authorizeToken')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'apiMap',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Api mapping" />,
		meta: 'Api mapping',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<ul className="max-w-[500px] font-medium">
						<li>
							Get campaign API:{' '}
							<span className="text-zinc-500">
								{row.original.apiMap?.getCampaignApi}
							</span>
						</li>
						<li>
							Get transaction API:{' '}
							<span className="text-zinc-500">
								{row.original.apiMap?.getTransactionApi}
							</span>
						</li>
						<li>
							Get campaign comission API:{' '}
							<span className="text-zinc-500">
								{row.original.apiMap?.getCampaignCommissionApi}
							</span>
						</li>
					</ul>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
