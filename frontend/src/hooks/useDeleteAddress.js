import { useState } from 'react';

export const useDeleteAddress = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteAddress = async (id) => {
    setIsDeleting(true);
    setDeleteError(null);

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) {
      setDeleteError('No token found');
      setIsDeleting(false);
      return;
    }

    try {
      const res = await fetch(`/api/addresses/deleteAddress/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete address');

      return data;
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteAddress, isDeleting, deleteError };
};
