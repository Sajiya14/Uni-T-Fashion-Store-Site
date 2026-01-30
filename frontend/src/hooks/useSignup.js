import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const navigate = useNavigate();


    const signup = async (firstName, lastName, email, password ) => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({firstName, lastName, email, password}),
            })
    
            const result = await response.json();

            if (!response.ok) {
                setIsLoading(false)
                setError(result.error)
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(result))
                navigate('/my-account');
                window.location.reload();
        
                dispatch({type: 'LOGIN', payload: result})

            }
        }catch(err){
            setError(err.message);
        }finally{
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error}
}