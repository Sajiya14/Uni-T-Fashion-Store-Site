import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

export const useAddToCart = () => {
  const { dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const addToCart = async (
        productId, 
        quantity = 1, 
        size, 
        color, 
        productDetails
    ) => {
        setLoading(true);

    try {
      const guestId =
        localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
        localStorage.setItem("guestId", guestId);

      const res = await fetch("http://localhost:9000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity,
          size,
          color,
          userId: user?.id || null,
          guestId: user ? null : guestId,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      // Dispatch to context
      dispatch({
        type: "ADD_ITEM",
        payload: {
          _id: `${productId}_${size}_${color}`, // fallback _id
          productId,
          title: productDetails?.title || "Product",
          images: productDetails?.images || [],
          price: productDetails?.price || 0,
          size,
          color,
          quantity,
        },
      });
    } catch (err) {
      console.error("Failed to add to cart:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
};
