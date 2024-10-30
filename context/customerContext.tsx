'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const CustomerContext = createContext<any | undefined>(undefined);

export function useCustomerContext(): any {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error('useCustomerContext must be used within a CustomerContextProvider');
    }
    return context;
}

export const CustomerContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [customersData, setCustomersData] = useState<object | undefined>(undefined);
    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

    return (
        <CustomerContext.Provider value={{ customersData, setCustomersData, selected, setSelected, showConfirm, setShowConfirm }}>
            {children}
        </CustomerContext.Provider>
    );
};
