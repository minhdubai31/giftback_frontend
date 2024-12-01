'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const BrandContext = createContext<any | undefined>(undefined);

export function useBrandContext (): any {
	const context = useContext(BrandContext);
	if (!context) {
		throw new Error('useBrandContext must be used within a BrandContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const BrandContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [brandsData, setBrandsData] = useState<object | undefined>(undefined);
	const [selected, SetSelected] = useState<number | undefined>(undefined);
	const [showConfirm, SetShowConfirm] = useState<boolean | undefined>(false);

	return (
		<BrandContext.Provider value={{ brandsData, setBrandsData, selected, SetSelected, showConfirm, SetShowConfirm }}>
			{children}
		</BrandContext.Provider>
	);
};
