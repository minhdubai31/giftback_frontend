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
import { AffiliateProgram, affiliateProgramSchema } from '../data/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useProgramContext } from '@/context/programContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { putAffiliateProgram } from '@/services/programService';
import { toast } from 'sonner';
import { time } from 'console';
import { Textarea } from '@/components/ui/textarea';
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
	brandId: z.string(),
	programName: z.string().min(1, 'This field is required'),
	commissionRate: z.string().min(1, 'This field is required'),
	terms: z.string().min(1, 'This field is required'),
	programUrl: z.string().min(1, 'This field is required'),
	validFrom: z.date(),
	validUntil: z.date(),
});

export default function EditPage() {
	getBrand();
	const router = useRouter();
	const { programsData } = useProgramContext();
	const { brandsData } = useBrandContext();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const data = programsData?.find((item: AffiliateProgram) => item.id.toString() == id);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data?.id ?? 0,
			brandId: data?.brand.id.toString() ?? "",
			programName: data?.programName ?? '',
			commissionRate: data?.commissionRate.toString() ?? '',
			terms: data?.terms ?? '',
			programUrl: data?.programUrl ?? '',
			validFrom: data?.validFrom ?? new Date(),
			validUntil: data?.validUntil ?? new Date(),
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const data: AffiliateProgram = {
				id: values.id,
				brand: {
					id: Number(values.brandId),
					name: '',
					description: '',
					logoPath: ''
				},
				programName: values.programName,
				commissionRate: Number(values.commissionRate),
				terms: values.terms,
				programUrl: values.programUrl,
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
								name="brandId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Brand</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
												<SelectTrigger>
													<SelectValue placeholder="Select brand" />
												</SelectTrigger>
												<SelectContent>
													{brandsData?.map((brand: Brand) => (
														<SelectItem
															key={brand.id}
															value={brand.id.toString()}
														>
															{brand.name}
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
											<Input placeholder="0" type="number" {...field} />
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
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
