'use client';
import { Button } from '@/components/ui/button';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Cashback } from '../data/schema'; // Removed unused import of cashbackSchema
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useCashbackContext } from '@/context/cashbackContext';
import { putCashback } from '@/services/cashbackService';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Suspense } from 'react';

// Define the form schema for validation
const formSchema = z.object({
	id: z.number(),
	transactionId: z.string().min(1, "This is required field"),
	amount: z.string(),
	earnedAt: z.date(),
});

function EditPage() {
	const router = useRouter();
	const { cashbacksData } = useCashbackContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data: Cashback = cashbacksData?.find((item: Cashback) => item.id.toString() == id);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			transactionId: data?.transaction?.id.toString() ?? '',
			amount: data?.amount?.toString() ?? '0',
			earnedAt: data?.earnedAt ?? undefined,
		},
	});

	// Function to handle form submission
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: Cashback = {
				id: values.id,
				transaction: {
					id: Number(values.transactionId),
				},
				amount: Number(values.amount),
				earnedAt: values.earnedAt,
			};

			await putCashback(data);
			toast.success('Cashback updated successfully.');
			router.back();
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	}

	return (
		<>
			<div className="h-full flex-1 flex-col space-y-8 p-2 md:flex">
				<Button
					variant="outline"
					size="sm"
					className="mr-auto h-8 flex"
					onClick={() => router.back()}
				>
					<ArrowLeft className="mr-2 h-8 w-8" />
					Back
				</Button>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="transactionId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Transaction ID</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Transaction ID"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										<FormControl>
											<Input type="number" placeholder="Amount" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="earnedAt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Earned at</FormLabel>
										<FormControl>
											<div>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={'outline'}
																className={cn(
																	'pl-3 text-left font-normal w-full',
																	!field.value &&
																		'text-muted-foreground'
																)}
															>
																{field.value ? (
																	format(field.value, 'PPP')
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent
														className="w-auto p-0"
														align="start"
													>
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</>
	);
}

const Page = () => {
	return (
		 <Suspense>
			  <EditPage />
		 </Suspense>
	)
}

export default Page