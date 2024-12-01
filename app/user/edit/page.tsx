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
import { User } from '../data/schema'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useUserContext } from '@/context/userContext'; 
import { useRouter, useSearchParams } from 'next/navigation';
import { putUser } from '@/services/userService'; 
import { toast } from 'sonner';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { getGroup } from '@/services/groupService'; 

const formSchema = z.object({
	id: z.number(),
	username: z.string().min(1, 'This is required field'),
	name: z.string().min(1, 'This is required field'),
	role: z.string(),
	groupId: z.string(),
	wallet: z.string(),
	walletId: z.number().nullable().optional(),
	password: z.string().min(1, 'This is required field'),
	bankName: z.string(),
	bankAccountNumber: z.string(),
});

let groupsData: any = [];

export default function EditPage() {
	getGroup(); // Fetches the group data for selection
	const router = useRouter();
	const { usersData } = useUserContext(); 
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data: User = usersData?.find((item: User) => item.id.toString() == id); 

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			username: data?.username ?? '',
			name: data?.name ?? '',
			role: data?.role ?? '',
			groupId: data?.group?.id?.toString() ?? '',
			walletId: data?.wallet?.id,
			wallet: data?.wallet?.balance?.toString() ?? '',
			password: id ? 'default' : '',
			bankName: data?.bankName ?? '',
			bankAccountNumber: data?.bankAccountNumber ?? '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: User = { 
				id: values.id,
				username: values.username,
				name: values.name,
				authProvider: undefined,
				role: undefined,
				group: {
					id: values.groupId == '' ? undefined : Number(values.groupId),
					name: undefined,
				},
				notifications: null,
				createdAt: undefined,
				updatedAt: undefined,
				password: values.password,
				bankName: values.bankName,
				bankAccountNumber: values.bankAccountNumber,
				wallet: {
					id: values.walletId ?? undefined,
					balance: Number(values.wallet)
				}
			};
			await putUser(data); 
			toast.success('User updated successfully.'); 
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
							{!id && <FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>}
							<FormField
								control={form.control}
								name="bankName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank Name</FormLabel>
										<FormControl>
											<Input placeholder="Bank Name" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bankAccountNumber" 
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank Account Number</FormLabel>
										<FormControl>
											<Input placeholder="Bank Account Number" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="wallet"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Wallet Balance</FormLabel>
										<FormControl>
											<Input placeholder="Wallet Balance" type="number" {...field} />
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
