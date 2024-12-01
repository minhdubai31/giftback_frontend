'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { affiliateNetworkSchema } from '../data/schema';
import Link from 'next/link';
import { useNetworkContext } from '@/context/networkContext';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const { SetSelected, SetShowConfirm } = useNetworkContext();
	const onDeleteSelect = (id: number) => {
		SetSelected(id);
		SetShowConfirm(true);
	};

	const affiliateNetwork = affiliateNetworkSchema.parse(row.original);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<DotsHorizontalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<Link
					href={{
						pathname: '/network/edit',
						query: { id: affiliateNetwork.id },
					}}
				>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onDeleteSelect(affiliateNetwork.id)}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
