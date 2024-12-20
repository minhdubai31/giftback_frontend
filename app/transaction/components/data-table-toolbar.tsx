'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/app/network/components/data-table-view-options';

import { PlusCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { updateTransactionFromNetwork } from '@/services/transactionService';
import { toast } from 'sonner';
import axios from 'axios';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const updateTransaction = async () => {
		try {
			await updateTransactionFromNetwork();
			toast.success('Transactions updated successfully.');
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter transaction..."
					value={(table.getColumn('program')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex gap-2">
				<Button
					onClick={updateTransaction}
					variant="outline"
					size="sm"
					className="ml-auto h-8 flex"
				>
					<RefreshCcw className="mr-2 h-4 w-4" />
					Update from affiliate networks
				</Button>
				<Link href="/transaction/edit">
					<Button variant="outline" size="sm" className="ml-auto h-8 flex">
						<PlusCircle className="mr-2 h-4 w-4" />
						Add new
					</Button>
				</Link>
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
