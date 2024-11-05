'use client';

import { useRouter } from 'next/navigation'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/services/authService'; 
import { toast } from 'sonner';
import axios from 'axios';

// Define the schema for form validation using Zod
const formSchema = z.object({
	username: z.string().min(3, {
		message: 'Username must be at least 3 characters.',
	}),
	password: z.string().min(3, {
		message: 'Password must be at least 3 characters.',
	}),
});

function ProfileForm() {
	const router = useRouter(); // Initialize the router

	// Initialize the form with validation schema and default values
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	// Handle form submission
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await login(values.username, values.password); // Call the login function
			router.replace('/'); // Redirect to home on successful login
		} catch (error) {
			toast.error('Uh oh! Something went wrong.', {
				description: axios.isAxiosError(error)
					? error.response?.data?.message || 'An error occurred'
					: `Unexpected error: ${error}`,
			});
		}
	}

	return (
		<div className="container mx-auto">
			<div className="max-w-screen-sm mx-auto mt-20">
				<p className="font-medium text-4xl text-center mb-5">Login</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Your username" {...field} />
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Your password"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default ProfileForm;
