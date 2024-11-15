import { Notification, notificationSchema } from '@/app/notification/data/schema';
import { BASE_URL } from '@/constant/common';
import { useNotificationContext } from '@/context/notificationContext';
import axios from 'axios';
import useSWR from 'swr';
import { z } from 'zod';

export const GET_API_URL = BASE_URL + '/notifications/grouped';
export const POST_API_URL = BASE_URL + '/notifications/sendToAll';

const fetcher = (url: string) =>
	axios.get(url).then((res) => z.array(notificationSchema).parse(res.data.data));

export const getNotification = () => {
	const { setNotificationsData } = useNotificationContext();
	return useSWR(GET_API_URL, fetcher, {
		onSuccess: (data) => {
			setNotificationsData(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export const putNotification = async (data: string) => {
	await axios.post(
		POST_API_URL,
		{ message: data },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
};
