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
import { Brand, brandSchema } from '@/app/brand/data/schema';
import { useBrandContext } from '@/context/brandContext';
import { getBrand } from '@/services/brandService';

const formSchema = z.object({
	id: z.number(),
	username: z.string().min(1, 'This field is required'),
	name: z.string().min(1, 'This field is required'),
	authProvider: z.string(),
	groupId: z.number(),
});


export default function EditPage() {
	getBrand();
	const router = useRouter();
	const { groupsData } = useGroupContext(); // Changed from customersData to groupsData
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data = groupsData?.find((item: Group) => item.id.toString() == id); // Changed from Customer to Group

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			username: data?.username ?? '',
			name: data?.name ?? '',
			authProvider: data?.authProvider ?? '',
			groupId: data?.group.id ?? 0,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: Group = { // Changed from Customer to Group
				id: values.id,
				username: values.username,
				name: values.name,
				authProvider: values.authProvider,
				group: {
					id: values.groupId,
					name: '',
				},
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
								name="groupId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Group</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value.toString()}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select group" />
												</SelectTrigger>
												<SelectContent>
													{groupsData?.map((group: any) => (
														<SelectItem
															key={group.id}
															value={group.id.toString()}
														>
															{group.name}
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
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Username" {...field} />
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
								name="authProvider"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Auth Provider</FormLabel>
										<FormControl>
											<Input placeholder="Auth Provider" {...field} />
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
