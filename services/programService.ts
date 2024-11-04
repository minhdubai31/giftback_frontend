import { AffiliateProgram, affiliateProgramSchema } from '@/app/program/data/schema';
import { BASE_URL } from '@/constant/common';
import { useProgramContext } from '@/context/programContext';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/programs';
export const POST_API_URL = BASE_URL + '/programs';
export const PUT_API_URL = BASE_URL + '/programs/';
export const DELETE_API_URL = BASE_URL + '/programs/';
export const UPDATE_FROM_NETWORK_API_URL = BASE_URL + '/programs/load-from-network';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(affiliateProgramSchema).parse(res.data.data));

export const getAffiliateProgram = () => {
	const { setProgramsData } = useProgramContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setProgramsData(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export const putAffiliateProgram = async (data: AffiliateProgram) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteAffiliateProgram = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};

export const updateAffiliateProgramFromNetwork = async () => {
	await axios.get(UPDATE_FROM_NETWORK_API_URL);
	mutate(GET_API_URL);
}
