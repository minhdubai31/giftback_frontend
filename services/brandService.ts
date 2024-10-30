import { Brand, brandSchema } from '@/app/brand/data/schema';
import { BASE_URL } from '@/constant/common';
import { useBrandContext } from '@/context/brandContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/brands';
export const POST_API_URL = BASE_URL + '/brands';
export const PUT_API_URL = BASE_URL + '/brands/';
export const DELETE_API_URL = BASE_URL + '/brands/';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(brandSchema).parse(res.data.data));

export const getBrand = () => {
	const { setBrandsData } = useBrandContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setBrandsData(data);
		},
	});
};

export const putBrand = async (data: Brand) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteBrand = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};
