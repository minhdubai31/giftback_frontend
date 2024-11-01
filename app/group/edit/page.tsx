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
import { Group } from '../data/schema'; // Changed from Customer to Group
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useGroupContext } from '@/context/groupContext'; // Changed from useCustomerContext to useGroupContext
import { useRouter, useSearchParams } from 'next/navigation';
import { putGroup } from '@/services/groupService'; // Changed from putCustomer to putGroup
import { toast } from 'sonner';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Customer, customerSchema } from '@/app/customer/data/schema'; // Changed from Brand to Customer
import { useCustomerContext } from '@/context/customerContext'; // Changed from useBrandContext to useCustomerContext
import { getCustomers } from '@/services/customerService'; // Changed from getBrand to getCustomer

const formSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "This is required field"),
	ownerId: z.string(),
});


export default function EditPage() {
	getCustomers(); // Changed from getBrand to getCustomer
	const router = useRouter();
	const { groupsData } = useGroupContext();
	const { customersData } = useCustomerContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data: Group = groupsData?.find((item: Group) => item.id.toString() == id); // Changed from Customer to Group

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			name: data?.name ?? '',
			ownerId: data?.owner?.id?.toString() ?? "0",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: Group = { // Changed from Customer to Group
				id: values.id,
				name: values.name,
				owner: {
					id: Number(values.ownerId),
					name: undefined
				},
				createdAt: undefined,
				updatedAt: undefined
			};
			await putGroup(data); // Changed from putCustomer to putGroup
			toast.success('Group updated successfully.'); // Changed message to reflect group
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
						<div className="gap-x-8 space-y-2">
							<FormField
								control={form.control}
								name="ownerId"
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
													{customersData?.map((user: any) => (
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Name" {...field} />
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
