import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface RoleContextType {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
}

interface RoleProviderProps {
    children: ReactNode;
  }

export const RoleContext = createContext<RoleContextType>({ role: 'Student', setRole: () => {} });

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string>('Student');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};