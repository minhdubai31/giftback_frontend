'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const NotificationContext = createContext<any | undefined>(undefined);

export function useNotificationContext (): any {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('useNotificationContext must be used within a NotificationContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const NotificationContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [notificationsData, setNotificationsData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

	return (
		<NotificationContext.Provider value={{ notificationsData, setNotificationsData, selected, setSelected, showConfirm, setShowConfirm }}>
			{children}
		</NotificationContext.Provider>
	);
};
