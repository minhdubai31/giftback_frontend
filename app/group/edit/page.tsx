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
import { Group } from '../data/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useGroupContext } from '@/context/groupContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { putGroup } from '@/services/groupService';
import { toast } from 'sonner';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUserContext } from '@/context/userContext'; 
import { getUsers } from '@/services/userService'; 

const formSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "This is required field"),
	walletBalance: z.string(),
	ownerId: z.string(),
});

export default function EditPage() {
	getUsers(); // Fetch users for the owner selection
	const router = useRouter();
	const { groupsData } = useGroupContext();
	const { usersData } = useUserContext(); 
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data: Group = groupsData?.find((item: Group) => item.id.toString() == id); 

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			name: data?.name ?? '',
			walletBalance: data?.walletBalance?.toString() ?? '0',
			ownerId: data?.owner?.id?.toString() ?? "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: Group = {
				id: values.id,
				name: values.name,
				owner: {
					id: Number(values.ownerId),
				},
				walletBalance: Number(values.walletBalance),
				createdAt: undefined,
				updatedAt: undefined
			};
			await putGroup(data); 
			toast.success('Group updated successfully.'); 
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
													{usersData?.map((user: any) => (
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
							<FormField
								control={form.control}
								name="walletBalance"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Wallet Balance</FormLabel>
										<FormControl>
											<Input placeholder="Wallet Balance" type='number' {...field} />
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
