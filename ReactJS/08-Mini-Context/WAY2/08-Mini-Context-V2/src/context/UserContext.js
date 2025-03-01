import React from "react";

export const UserContext = React.createContext({
    user: null,
    setUser: () => {}
});

export const UserContextProvider = UserContext.Provider;

export default function useUser() {
    return React.useContext(UserContext);
}