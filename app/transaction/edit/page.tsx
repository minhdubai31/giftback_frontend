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
import { Transaction } from '../data/schema'; // Removed unused import of transactionSchema
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTransactionContext } from '@/context/transactionContext';
import { putTransaction } from '@/services/transactionService';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { getUsers } from '@/services/userService';
import { useUserContext } from '@/context/userContext';
import { useProgramContext } from '@/context/programContext';
import { getAffiliateProgram } from '@/services/programService';
import { User } from '@/app/user/data/schema';
import { AffiliateProgram } from '@/app/program/data/schema';
import { Suspense } from 'react';

const formSchema = z.object({
	id: z.number(),
	userId: z.string().min(1, 'This is required field'),
	programId: z.string().min(1, 'This is required field'),
	totalAmount: z.string(),
	cashbackAmount: z.string(),
	transactionDate: z.date(),
});

function EditPage() {
	getUsers(); // Fetch users for the select input
	getAffiliateProgram(); // Fetch affiliate programs for the select input
	const router = useRouter();
	const { programsData } = useProgramContext();
	const { usersData } = useUserContext();
	const { transactionsData } = useTransactionContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data: Transaction = transactionsData?.find(
		(item: Transaction) => item.id.toString() == id
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			userId: data?.user?.id.toString() ?? '',
			programId: data?.program?.id.toString() ?? '',
			totalAmount: data?.totalAmount?.toString() ?? '0',
			cashbackAmount: data?.cashbackAmount?.toString() ?? '0',
			transactionDate: data?.transactionDate ?? new Date(),
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const transaction: Transaction = {
				id: values.id,
				user: {
					id: Number(values.userId),
				},
				program: {
					id: Number(values.programId),
				},
				totalAmount: Number(values.totalAmount),
				cashbackAmount: Number(values.cashbackAmount),
				transactionDate: values.transactionDate,
			};
			await putTransaction(transaction);
			toast.success('Transaction updated successfully.');
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
								name="userId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>User</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value.toString()}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select user" />
												</SelectTrigger>
												<SelectContent>
													{usersData?.map((user: User) => (
														<SelectItem
															key={user.id}
															value={user.id.toString()}
														>
															{user.username}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="programId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Program</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value.toString()}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select program" />
												</SelectTrigger>
												<SelectContent>
													{programsData?.map(
														(program: AffiliateProgram) => (
															<SelectItem
																key={program.id}
																value={program.id.toString()}
															>
																{program.programName}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="totalAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Total Amount</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Total Amount"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cashbackAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cashback Amount</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Cashback Amount"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="transactionDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Transaction Date</FormLabel>
										<FormControl>
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