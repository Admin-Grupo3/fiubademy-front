import React, {useEffect} from "react";
import { UserContextType, UserType } from "../@types/sideBarType.tsx";
import { getUserProfile } from "../login/backend-api.ts";
export const UsersContext = React.createContext<UserContextType | null> (null);

interface Props {
    children: React.ReactNode;
  }

export const UsersProvider: React.FC<Props> = ({children}) => {
    const [user, setUser] = React.useState<UserType >();

    const fetchUserProfile = () => {
        getUserProfile()
            .then((data) => {
                if (data) { 
                    const transformedUser = {
                        id: data.id,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        birthDate: data.birthDate,
                        interests: data.interests,
                        exams_taken: data.exams_taken,
                        coursesAproved: data.coursesApproved
                    };
                    setUser(transformedUser);
                }
            })
            .catch(error => {
                console.error('Error al obtener el perfil del usuario:', error);
            });
        
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UsersContext.Provider value = {{
            user
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider;