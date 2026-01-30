// src/hooks/useUpdateAddress.js
import { useState } from 'react';

export const useUpdateAddress = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateAddress = async (id, address) => {
    setIsUpdating(true);
    setUpdateError(null);

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) {
      setUpdateError('No token found');
      setIsUpdating(false);
      return;
    }

    try {
      const res = await fetch(`/api/addresses/updateAddress/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to update address');

      return data; // Return updated address
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateAddress, isUpdating, updateError };
};
