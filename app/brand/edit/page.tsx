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
import { Brand } from '../data/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useBrandContext } from '@/context/brandContext';
import { putBrand } from '@/services/brandService';
import { Textarea } from '@/components/ui/textarea';
import { Suspense } from 'react';

// Define the form schema for validation
const formSchema = z.object({
	id: z.number(),
	name: z.string().min(1, 'This field is required'),
	description: z.string().min(1, 'This field is required'),
	logoPath: z.string(),
});

function EditPage() {
	const router = useRouter();
	const { brandsData } = useBrandContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	// Find the brand data based on the id from the search parameters
	const data: Brand = brandsData?.find((item: Brand) => item.id.toString() == id);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			name: data?.name ?? '',
			description: data?.description ?? '',
			logoPath: data?.logoPath ?? '',
		},
	});

	// Function to handle form submission
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await putBrand(values);
			toast.success('Network updated successfully.');
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Network name</FormLabel>
										<FormControl>
											<Input placeholder="Network name" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea placeholder="Description" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="logoPath"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Logo URL</FormLabel>
										<FormControl>
											<Input placeholder="Logo URL" {...field} />
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
