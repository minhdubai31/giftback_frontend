'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const PayoutContext = createContext<any | undefined>(undefined);

export function usePayoutContext (): any {
	const context = useContext(PayoutContext);
	if (!context) {
		throw new Error('usePayoutContext must be used within a PayoutContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const PayoutContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [payoutsData, setPayoutsData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);
	const [showUpdateConfirm, setShowUpdateConfirm] = useState<boolean | undefined>(false); // Added showUpdateConfirm

	return (
		<PayoutContext.Provider value={{ payoutsData, setPayoutsData, selected, setSelected, showConfirm, setShowConfirm, showUpdateConfirm, setShowUpdateConfirm }}>
			{children}
		</PayoutContext.Provider>
	);
};
