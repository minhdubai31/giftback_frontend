'use client';

import { useGlobalContext } from '@/context/globalContext';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useCustomerContext } from '@/context/customerContext';
import { deleteCustomer, GET_API_URL, getCustomers } from '@/services/customerService';
import { useEffect } from 'react';
import {
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { mutate } from 'swr';

export default function CustomerPage() {
	getCustomers();
	const { setTab } = useGlobalContext();
	const { customersData, selected, showConfirm, setShowConfirm } = useCustomerContext();
	const customerList = customersData ?? [];

	const onDeleteConfirmed = async () => {
		try {
			await deleteCustomer(selected);
			mutate(GET_API_URL);
			toast.success('Customer deleted successfully.');
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	}

	useEffect(() => {
		setTab('Customers');
	}, []);

	return (
		<>
			<AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete data from servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
						   onClick={onDeleteConfirmed}
							className={cn(buttonVariants({ variant: 'destructive' }))}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<div className="h-full flex-1 flex-col space-y-8 p-2 md:flex">
				<DataTable data={customerList} columns={columns} />
			</div>
		</>
	);
}
