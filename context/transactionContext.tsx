'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const TransactionContext = createContext<any | undefined>(undefined);

export function useTransactionContext (): any {
	const context = useContext(TransactionContext);
	if (!context) {
		throw new Error('useTransactionContext must be used within a TransactionContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const TransactionContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [transactionsData, setTransactionsData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

	return (
		<TransactionContext.Provider value={{ transactionsData, setTransactionsData, selected, setSelected, showConfirm, setShowConfirm }}>
			{children}
		</TransactionContext.Provider>
	);
};
