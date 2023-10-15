import * as React from 'react';
import { SideBarContextType, SidebarType } from "../@types/sideBarType.tsx";


interface Props {
    children: React.ReactNode;
  }

export const SidebarContext = React.createContext<SideBarContextType | null>(null);

const SidebarProvider:  React.FC<Props> = ({children}) => {
    const [state] = React.useState<SidebarType>({
        isOpen: false,
    });

    const openSidebar = () => {
        state.isOpen = true;
    }

    const closeSidebar = () => {
        state.isOpen = false;
    }

    return (
        <SidebarContext.Provider value = {{
            ...state,
            openSidebar, 
            closeSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    )
}
export default SidebarProvider;

