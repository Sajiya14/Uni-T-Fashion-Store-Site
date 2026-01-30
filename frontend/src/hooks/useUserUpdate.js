import { useState } from 'react';

export const useUserUpdate = () => {
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateUser = async (formData) => {
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    const token = JSON.parse(localStorage.getItem('user'))?.token;

    if (!token) {
        setError("No token found");
        setIsUpdating(false);
        return;
      }


    try {
      const response = await fetch('/api/users/userUpdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to update user');
      } else {
        setSuccess(true);
      }

    } catch (err) {
      setError('Something went wrong');
    }

    setIsUpdating(false);
  };

  return { updateUser, isUpdating, error, success };
};
