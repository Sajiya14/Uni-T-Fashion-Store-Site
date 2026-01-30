// src/hooks/useCartData.js
import { useState, useEffect } from "react";

export const useCartData = (token, guestId) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : { "Guest-Id": guestId },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, guestId]);

  return { cart, loading, error };
};
