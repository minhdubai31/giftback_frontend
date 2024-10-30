'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const ProgramContext = createContext<any | undefined>(undefined);

export function useProgramContext (): any {
	const context = useContext(ProgramContext);
	if (!context) {
		throw new Error('useProgramContext must be used within a ProgramContextProvider');
	}
	return context;
};

export interface ContextProviderProps {
	children: ReactNode;
}

export const ProgramContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [programsData, setProgramsData] = useState<object | undefined>(undefined);
	const [selected, setSelected] = useState<number | undefined>(undefined);
	const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

	return (
		<ProgramContext.Provider value={{ programsData, setProgramsData, selected, setSelected, showConfirm, setShowConfirm }}>
			{children}
		</ProgramContext.Provider>
	);
};