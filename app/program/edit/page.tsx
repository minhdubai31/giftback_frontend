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
import { AffiliateProgram } from '../data/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { useProgramContext } from '@/context/programContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { putAffiliateProgram } from '@/services/programService';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useNetworkContext } from '@/context/networkContext';
import { AffiliateNetwork } from '@/app/network/data/schema';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getAffiliateNetwork } from '@/services/networkService';
import { Suspense } from 'react';

// Schema for form validation
const formSchema = z.object({
	id: z.number(),
	programName: z.string().min(1, 'This field is required'),
	commissionRate: z.string().min(1, 'This field is required'),
	terms: z.string().min(1, 'This field is required'),
	programUrl: z.string().min(1, 'This field is required'),
	affiliateNetworkId: z.string(),
	validFrom: z.date().nullable().optional(),
	validUntil: z.date().nullable().optional(),
});

function EditPage() {
	// Fetch affiliate networks
	getAffiliateNetwork();
	const router = useRouter();
	const { programsData } = useProgramContext();
	const { networksData } = useNetworkContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data: AffiliateProgram = programsData?.find(
		(item: AffiliateProgram) => item.id.toString() == id
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			programName: data?.programName ?? '',
			commissionRate: data?.commissionRate?.toString() ?? '',
			terms: data?.terms ?? '',
			programUrl: data?.programUrl ?? '',
			affiliateNetworkId: data?.affiliateNetwork?.id.toString() ?? '',
			validFrom: data?.validFrom ?? undefined,
			validUntil: data?.validUntil ?? undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: AffiliateProgram = {
				id: values.id,
				programName: values.programName,
				commissionRate: values.commissionRate,
				terms: values.terms,
				programUrl: values.programUrl,
				affiliateNetwork: {
					id: Number(values.affiliateNetworkId),
				},
				validFrom: values.validFrom,
				validUntil: values.validUntil,
			};
			await putAffiliateProgram(data);
			toast.success('Program updated successfully.');
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
								name="affiliateNetworkId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Affiliate Network</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value.toString()}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select affiliate network" />
												</SelectTrigger>
												<SelectContent>
													{networksData?.map(
														(network: AffiliateNetwork) => (
															<SelectItem
																key={network.id}
																value={network.id.toString()}
															>
																{network.name}
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
								name="programName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Program name</FormLabel>
										<FormControl>
											<Input placeholder="Program name" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="programUrl"
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
								name="commissionRate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Commission rate</FormLabel>
										<FormControl>
											<Input placeholder="0" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-5">
								<FormField
									control={form.control}
									name="validFrom"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Valid from</FormLabel>
											<FormControl>
												<div>
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
																selected={field.value || undefined}
																onSelect={field.onChange}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</div>
											</FormControl>
											<FormMessage className="text-xs" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="validUntil"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Valid until</FormLabel>
											<FormControl>
												<div>
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
																selected={field.value || undefined}
																onSelect={field.onChange}
																// Disable dates that are before the validFrom date
																disabled={(date) => {
																	const validFrom =
																		form.getValues('validFrom');
																	return validFrom
																		? date < validFrom
																		: false;
																}}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</div>
											</FormControl>
											<FormMessage className="text-xs" />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="terms"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Terms</FormLabel>
										<FormControl>
											<Textarea placeholder="Terms" {...field} />
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