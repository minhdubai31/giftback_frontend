'use client';

import { useGlobalContext } from '@/context/globalContext';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useProgramContext } from '@/context/programContext';
import { deleteAffiliateProgram, GET_API_URL, getAffiliateProgram } from '@/services/programService';
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
import { getBrand } from '@/services/brandService';

export default function programPage() {
	getAffiliateProgram();
	getBrand();
	const { setTab } = useGlobalContext();
	const { programsData, selected, showConfirm, setShowConfirm } = useProgramContext();
	const affiliatePrograms = programsData ?? [];

	const onDeleteConfirmed = async () => {
		try {
			await deleteAffiliateProgram(selected);
			mutate(GET_API_URL);
			toast.success('Program deleted successfully.');
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	}

	useEffect(() => {
		setTab('Affiliate Program');
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
			<div className="h-full flex-1 flex-col space-y-8 p-2 md:flex">
				<DataTable data={affiliatePrograms} columns={columns} />
			</div>
		</>
	);
}
