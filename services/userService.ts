import { User, userSchema } from '@/app/user/data/schema';
import { BASE_URL } from '@/constant/common';
import { useUserContext } from '@/context/userContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/users';
export const POST_API_URL = BASE_URL + '/users';
export const PUT_API_URL = BASE_URL + '/users/';
export const DELETE_API_URL = BASE_URL + '/users/';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(userSchema).parse(res.data.data));

export const getUsers = () => {
	const { setUsersData } = useUserContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setUsersData(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export const putUser = async (data: User) => {
	const id = data.id == 0 ? '' : data.id;
	if (!data.group?.id) {
		data.group = undefined;
	}
	console.log(data)
	if (id) {
		await axios.put(PUT_API_URL + id, data);
	} else {
		await axios.post(POST_API_URL, data);
	}
};

export const deleteUser = async (id: number) => {
	await axios.delete(DELETE_API_URL + id);
};
