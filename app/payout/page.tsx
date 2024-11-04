'use client';

import { useGlobalContext } from '@/context/globalContext';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { deletePayout, GET_API_URL, getPayout, updatePayoutStatus } from '@/services/payoutService';
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
import { usePayoutContext } from '@/context/payoutContext';

export default function payoutPage() {
	getPayout();
	const { setTab } = useGlobalContext();
	const { payoutsData, selected, showConfirm, setShowConfirm, showUpdateConfirm, setShowUpdateConfirm } = usePayoutContext();
	const payouts = payoutsData ?? [];

	const onDeleteConfirmed = async () => {
		try {
			await deletePayout(selected);
			mutate(GET_API_URL);
			toast.success('Payout deleted successfully.');
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	}

	const onUpdateConfirmed = async (status: string) => {
		try {
			await updatePayoutStatus(selected, status);
			mutate(GET_API_URL);
			toast.success('Payout updated successfully.');
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	}

	useEffect(() => {
		setTab('Payout');
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
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog open={showUpdateConfirm} onOpenChange={setShowUpdateConfirm}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Update</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to update this payout? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
						   onClick={() => onUpdateConfirmed('COMPLETED')}
							className={cn(buttonVariants({ variant: 'default' }), "bg-green-600 hover:bg-green-500")}
						>
							Complete
						</AlertDialogAction>
						<AlertDialogAction
						   onClick={() => onUpdateConfirmed('DENIED')}
							className={cn(buttonVariants({ variant: 'destructive' }))}
						>
							Deny
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<div className="h-full flex-1 flex-col space-y-8 p-2 md:flex">
				<DataTable data={payouts} columns={columns} />
			</div>
		</>
	);
}
