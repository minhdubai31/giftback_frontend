import { Transaction, transactionSchema } from '@/app/transaction/data/schema';
import { BASE_URL } from '@/constant/common';
import { useTransactionContext } from '@/context/transactionContext';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/transactions';
export const POST_API_URL = BASE_URL + '/transactions';
export const PUT_API_URL = BASE_URL + '/transactions/';
export const DELETE_API_URL = BASE_URL + '/transactions/';
export const UPDATE_FROM_NETWORK_API_URL = BASE_URL + '/transactions/update-from-network';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(transactionSchema).parse(res.data.data));

export const getTransaction = () => {
	const { setTransactionsData } = useTransactionContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setTransactionsData(data);
		},
	});
};

export const putTransaction = async (data: Transaction) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteTransaction = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};

export const updateTransactionFromNetwork = async () => {
	await axios.get(UPDATE_FROM_NETWORK_API_URL);
	mutate(GET_API_URL);
};
