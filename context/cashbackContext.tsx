'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const CashbackContext = createContext<any | undefined>(undefined);

export function useCashbackContext (): any {
	const context = useContext(CashbackContext);
	if (!context) {
		throw new Error('useCashbackContext must be used within a CashbackContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const CashbackContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [cashbacksData, setCashbacksData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);
	const [showUpdateConfirm, setShowUpdateConfirm] = useState<boolean | undefined>(false); // Added showUpdateConfirm

	return (
		<CashbackContext.Provider value={{ cashbacksData, setCashbacksData, selected, setSelected, showConfirm, setShowConfirm, showUpdateConfirm, setShowUpdateConfirm }}>
			{children}
		</CashbackContext.Provider>
	);
};
