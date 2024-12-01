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

import { userSchema } from '../data/schema';
import Link from 'next/link';
import { useUserContext } from '@/context/userContext';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const { SetSelected, SetShowConfirm } = useUserContext();
	const onDeleteSelect = (id: number) => {
		SetSelected(id);
		SetShowConfirm(true);
	};

	const user = userSchema.parse(row.original);

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
						pathname: '/user/edit',
						query: { id: user.id },
					}}
				>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onDeleteSelect(user.id)}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
