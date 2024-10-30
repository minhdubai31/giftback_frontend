'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter program..."
					value={(table.getColumn('programName')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('programName')?.setFilterValue(event.target.value)
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
				<Link href="/program/edit">
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
