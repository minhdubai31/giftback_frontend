import { Payout, payoutSchema } from '@/app/payout/data/schema';
import { BASE_URL } from '@/constant/common';
import { usePayoutContext } from '@/context/payoutContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/payouts';
export const POST_API_URL = BASE_URL + '/payouts';
export const PUT_API_URL = BASE_URL + '/payouts/';
export const DELETE_API_URL = BASE_URL + '/payouts/';
export const UPDATE_STATUS_API_URL = BASE_URL + '/payouts/';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(payoutSchema).parse(res.data.data));

export const getPayout = () => {
	const { setPayoutsData } = usePayoutContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setPayoutsData(data);
		},
	});
};

export const putPayout = async (data: Payout) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deletePayout = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};

export const updatePayoutStatus = async (id: number, status: string) => {
	console.log(status)
	await axios.put(UPDATE_STATUS_API_URL + id + '/status', status, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
