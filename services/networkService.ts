import { AffiliateNetwork, affiliateNetworkSchema } from '@/app/network/data/schema';
import { BASE_URL } from '@/constant/common';
import { useNetworkContext } from '@/context/networkContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/networks';
export const POST_API_URL = BASE_URL + '/networks';
export const PUT_API_URL = BASE_URL + '/networks/';
export const DELETE_API_URL = BASE_URL + '/networks/';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(affiliateNetworkSchema).parse(res.data.data));

export const getAffiliateNetwork = () => {
	const { setNetworksData } = useNetworkContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setNetworksData(data);
		},
	});
};

export const putAffiliateNetwork = async (data: AffiliateNetwork) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteAffiliateNetwork = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};
