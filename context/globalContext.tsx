'use client'
import { createContext, ReactNode, useContext, useState } from 'react';


const GlobalContext = createContext<any | undefined>(undefined);

export const useGlobalContext = (): any => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useTab must be used within a GlobalContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const GlobalContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [tab, setTab] = useState<string>('Dashboard');

	return <GlobalContext.Provider value={{ tab, setTab }}>{children}</GlobalContext.Provider>;
};
