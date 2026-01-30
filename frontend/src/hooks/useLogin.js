import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const navigate = useNavigate();


    const login = async ( email, password ) => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
            })
    
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login Failed');
                return;
            }

            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
                
            //window.location.reload();
        
            dispatch({type: 'LOGIN', payload: data});
            navigate('/my-account');
            
        }catch(err){
            setError('Network error: ' + err.message);
        }finally{
            setIsLoading(false)
        }
    }

    return { login, isLoading, error}
}