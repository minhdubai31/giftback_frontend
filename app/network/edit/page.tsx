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
import { AffiliateNetwork } from '../data/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useNetworkContext } from '@/context/networkContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { putAffiliateNetwork } from '@/services/networkService';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
	id: z.number(),
	name: z.string().min(1, 'This field is required'),
	url: z.string().min(1, 'This field is required'),
	authorizeToken: z.string().min(1, 'This field is required'),
	apiMap: z.object({
		getCampaignApi: z.string().min(1, 'This field is required'),
		getTransactionApi: z.string().min(1, 'This field is required'),
		getCampaignCommissionApi: z.string().min(1, 'This field is required'),
	}),
});

export default function EditPage() {
	const router = useRouter();
	const { networksData } = useNetworkContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	// Find the network data based on the ID from the search parameters
	const data = networksData?.find((item: AffiliateNetwork) => item.id.toString() == id);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			name: data?.name ?? '',
			url: data?.url ?? '',
			authorizeToken: data?.authorizeToken ?? '',
			apiMap: {
				getCampaignApi: data?.apiMap?.getCampaignApi ?? '',
				getTransactionApi: data?.apiMap?.getTransactionApi ?? '',
				getCampaignCommissionApi: data?.apiMap?.getCampaignCommissionApi ?? '',
			},
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await putAffiliateNetwork(values);
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
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-2 gap-x-8 gap-y-2">
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
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input placeholder="URL" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="authorizeToken"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Authorize token</FormLabel>
										<FormControl>
											<Input placeholder="Token" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</div>
						<Separator />
						<div className="grid grid-cols-2 gap-x-8 gap-y-2">
							<FormField
								control={form.control}
								name="apiMap.getCampaignApi"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Get campaign API</FormLabel>
										<FormControl>
											<Input placeholder="API" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="apiMap.getTransactionApi"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Get transaction API</FormLabel>
										<FormControl>
											<Input placeholder="API" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="apiMap.getCampaignCommissionApi"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Get campaign commission API</FormLabel>
										<FormControl>
											<Input placeholder="API" {...field} />
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
