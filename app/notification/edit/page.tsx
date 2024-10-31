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
import { Notification } from '../data/schema'; // Changed from Group to Notification
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useNotificationContext } from '@/context/notificationContext'; // Changed from useGroupContext to useNotificationContext
import { useRouter, useSearchParams } from 'next/navigation';
import { putNotification } from '@/services/notificationService'; // Changed from putGroup to putNotification
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
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
	message: z.string().min(5, "Please enter at least 5 characters")
});


export default function EditPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: ""
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await putNotification(values.message); // Changed from putGroup to putNotification
			toast.success('Notification sent successfully.'); // Changed message to reflect notification
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
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<Textarea placeholder="Message" {...field} />
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
