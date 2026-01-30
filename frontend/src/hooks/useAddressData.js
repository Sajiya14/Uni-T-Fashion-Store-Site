// src/hooks/useAddressData.js
import { useState, useEffect } from 'react';

const useAddressData = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchAddresses = async () => {
      setIsLoading(true);
      setError(null);

      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (!token) {
        setError('No token found');
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/addresses/getAddresses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch addresses');

        setUserAddresses(data);
      } catch (err) {
        setError(err.message);
        setUserAddresses([]);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchAddresses();
    },[]);
    
    return { userAddresses,setUserAddresses,  isLoading, error, fetchAddresses };
};

export default useAddressData;
