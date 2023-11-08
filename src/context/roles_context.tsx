import React from "react";

export const RoleContext = React.createContext({ role: '', setRole: () => {} });

export const RoleProvider = ({ children }) => {
    const [role, setRole] = React.useState('Student');
    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};