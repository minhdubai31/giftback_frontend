import { Customer, customerSchema } from '@/app/customer/data/schema';
import { BASE_URL } from '@/constant/common';
import { useCustomerContext } from '@/context/customerContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/users';
export const POST_API_URL = BASE_URL + '/users';
export const PUT_API_URL = BASE_URL + '/users/';
export const DELETE_API_URL = BASE_URL + '/users/';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(customerSchema).parse(res.data.data));

export const getCustomers = () => {
	const { setCustomersData } = useCustomerContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setCustomersData(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export const putCustomer = async (data: Customer) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
        console.log(data)
		await axios.post(POST_API_URL, data);
	}
};

export const deleteCustomer = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};
