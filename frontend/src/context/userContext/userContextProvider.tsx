import userContext from "./userContext.tsx";
import React from "react";

type UserContextProviderProps = {
    children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [currentUser, setCurrentUser] = React.useState("");
        return(
            <userContext.Provider value={{ currentUser, setCurrentUser }}>
                {children}
            </userContext.Provider> 
        )
}

export default UserContextProvider;    