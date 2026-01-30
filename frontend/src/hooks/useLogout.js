import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const [isLoading, setIsLoading] = useState(null)

    const logout = () => {
        localStorage.removeItem('user')
        setIsLoading(true)

        dispatch({type: 'LOGOUT'})
    }

    return {logout, isLoading}
}