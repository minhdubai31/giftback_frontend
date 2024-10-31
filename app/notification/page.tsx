'use client';

import { useGlobalContext } from '@/context/globalContext';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useNotificationContext } from '@/context/notificationContext';
import { getNotification } from '@/services/notificationService';
import { useEffect } from 'react';

export default function NotificationPage() {
	getNotification();
	const { setTab } = useGlobalContext();
	const { notificationsData } = useNotificationContext();
	const notificationList = notificationsData ?? [];

	useEffect(() => {
		setTab('Notification');
	}, []);

	return (
		<>
			<div className="h-full flex-1 flex-col space-y-8 p-2 md:flex">
				<DataTable data={notificationList} columns={columns} />
			</div>
		</>
	);
}
