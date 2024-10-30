import { Group, groupSchema } from '@/app/group/data/schema';
import { BASE_URL } from '@/constant/common';
import { useGroupContext } from '@/context/groupContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/groups';
export const POST_API_URL = BASE_URL + '/groups';
export const PUT_API_URL = BASE_URL + '/groups/';
export const DELETE_API_URL = BASE_URL + '/groups/';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(groupSchema).parse(res.data.data));

export const getGroup = () => {
	const { setGroupsData } = useGroupContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setGroupsData(data);
			console.log(data)
		},
		onError: (error) => {
			console.log(error);
		}
	});
};

export const putGroup = async (data: Group) => {
	const id = data.id == 0 ? '' : data.id;
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteGroup = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};
