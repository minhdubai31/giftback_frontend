'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const NetworkContext = createContext<any | undefined>(undefined);

export function useNetworkContext (): any {
	const context = useContext(NetworkContext);
	if (!context) {
		throw new Error('useNetworkContext must be used within a NetworkContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const NetworkContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [networksData, setNetworksData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

	return (
		<NetworkContext.Provider value={{ networksData, setNetworksData, selected, setSelected, showConfirm, setShowConfirm }}>
			{children}
		</NetworkContext.Provider>
	);
};
