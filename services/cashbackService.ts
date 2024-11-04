import { Cashback, cashbackSchema } from '@/app/cashback/data/schema';
import { BASE_URL } from '@/constant/common';
import { useCashbackContext } from '@/context/cashbackContext';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/cashbacks';
export const POST_API_URL = BASE_URL + '/cashbacks';
export const PUT_API_URL = BASE_URL + '/cashbacks/';
export const DELETE_API_URL = BASE_URL + '/cashbacks/';
export const UPDATE_FROM_NETWORK_API_URL = BASE_URL + '/cashbacks/load-from-network';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(cashbackSchema).parse(res.data.data));

export const getCashback = () => {
	const { setCashbacksData } = useCashbackContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setCashbacksData(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export const putCashback = async (data: Cashback) => {
	console.log(data)
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteCashback = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};

export const updateCashbackFromNetwork = async () => {
	await axios.get(UPDATE_FROM_NETWORK_API_URL);
	mutate(GET_API_URL);
}
