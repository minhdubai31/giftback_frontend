'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Payout } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { usePayoutContext } from '@/context/payoutContext';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Payout>[] = [
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
		accessorKey: 'username',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
		meta: 'Username',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.original.user.username}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'paymentInfo',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Payment Information" />
		),
		meta: 'Payment Information',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.original.user.bankName} <br /> {row.original.user.bankAccountNumber}
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
					<span className="max-w-[500px] truncate font-medium">
						{row.original.amount.toLocaleString("vi-VN") + " đ"}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'requestedAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Requested Date" />,
		meta: 'Requested Date',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[200px] truncate font-medium">
						{row.original.requestedAt?.toLocaleDateString() || 'N/A'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'status',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
		meta: 'Status',
		cell: ({ row }) => {
			const { SetShowUpdateConfirm, SetSelected } = usePayoutContext(); // Moved hook call inside the cell function
			return (
				<div className="flex space-x-2">
					<TooltipProvider delayDuration={200}>
						<Tooltip>
							<TooltipTrigger asChild={true}>
								<Button
									onClick={() => {
										SetSelected(row.original.id);
										SetShowUpdateConfirm(true);
									}}
									className={
										row.getValue('status') === 'PENDING'
											? 'bg-gray-600'
											: row.getValue('status') === 'COMPLETED'
											? 'bg-green-600'
											: 'bg-red-600'
									}
								>
									{row.getValue('status')}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Click to change status</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
