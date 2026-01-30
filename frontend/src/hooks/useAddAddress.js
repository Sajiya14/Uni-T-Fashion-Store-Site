import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useAddAddress = () => { 
    const [error, setError] = useState("")  
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const addAddress = async (formData) => { 

        setIsLoading(true);
        setError('');
        

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) {
        setError("No token found");
        setIsLoading(false);
        return;
    }

    try{
        const response = await fetch('/api/addresses/addAddress', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
    
        const data = await response.json();

            if (!response.ok) {
                setIsLoading(false)
                setError(data.error)
            }

            if (response.ok) {
                localStorage.setItem('addresses', JSON.stringify(data))
                
        
                dispatch({type: 'LOGIN', payload: data})

            }
        }catch(err){
            setError(err.message);
        }finally{
            setIsLoading(false)
        }
    }

    return { addAddress, isLoading, error}
}