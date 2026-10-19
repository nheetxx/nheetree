import { useCallback, useState, createContext, useContext } from "react";

export const InitialUserState = {
    email: null,
    uid: null,
}

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = (props) => {
    const [userState, setUserState] = useState(InitialUserState)
    const setUser = useCallback((userCredentials) => {
        setUserState({ ...userCredentials });
    }, [])

    const ResetUser = useCallback(() => {
        setUserState(InitialUserState)
    }, [])

    const value = { ...userState, setUser, ResetUser }

    return <UserContext.Provider value={value} {...props} />
}