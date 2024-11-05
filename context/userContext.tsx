'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const UserContext = createContext<any | undefined>(undefined);

export function useUserContext(): any {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [usersData, setUsersData] = useState<object | undefined>(undefined);
    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState<boolean | undefined>(false);

    return (
        <UserContext.Provider value={{ usersData, setUsersData, selected, setSelected, showConfirm, setShowConfirm }}>
            {children}
        </UserContext.Provider>
    );
};
