'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const GroupContext = createContext<any | undefined>(undefined);

export function useGroupContext (): any {
	const context = useContext(GroupContext);
	if (!context) {
		throw new Error('useGroupContext must be used within a GroupContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const GroupContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [groupsData, setGroupsData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

	return (
		<GroupContext.Provider value={{ groupsData, setGroupsData, selected, setSelected, showConfirm, setShowConfirm }}>
			{children}
		</GroupContext.Provider>
	);
};
