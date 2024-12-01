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
import { Payout } from '../data/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { usePayoutContext } from '@/context/payoutContext';
import { putPayout } from '@/services/payoutService';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUserContext } from '@/context/userContext';
import { getUsers } from '@/services/userService';
import { User } from '@/app/user/data/schema';
import { Suspense } from 'react';

const formSchema = z.object({
	id: z.number(),
	userId: z.string().min(1, 'This field is required'),
	amount: z.string(),
	status: z.enum(['PENDING', 'COMPLETED', 'DENIED']).default('PENDING'),
});

function EditPage() {
	getUsers(); // Fetch users data
	const router = useRouter();
	const { usersData } = useUserContext();
	const { payoutsData } = usePayoutContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data = payoutsData?.find((item: Payout) => item.id.toString() == id);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			userId: data?.user.id ?? '',
			amount: data?.amount.toString() ?? '0',
			status: data?.status ?? 'PENDING',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: Payout = {
				id: values.id,
				user: {
					id: Number(values.userId),
				},
				amount: Number(values.amount),
				status: values.status,
				requestedAt: new Date(), // Set the requested date to now
			};
			await putPayout(data);
			toast.success('Payout updated successfully.');
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
										<FormLabel>Owner</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value.toString()}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select owner" />
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
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="PENDING">Pending</SelectItem>
													<SelectItem value="COMPLETED">
														Completed
													</SelectItem>
													<SelectItem value="DENIED">Denied</SelectItem>
												</SelectContent>
											</Select>
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