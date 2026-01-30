import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
//import { useCartContext } from "../CartContext";
//import { useAuthContext } from "./useAuthContext";
//import { useState, useEffect } from "react";

export const useCart = () => {
  const { cart, totalPrice, dispatch } = CartContext();
  const { user } = AuthContext();
  //const [guestId, setGuestId] = useState(() => localStorage.getItem("guestId") || null);

  // generate guestId if not exists
  /*useEffect(() => {
    if (!guestId) {
      const id = "guest_" + new Date().getTime();
      setGuestId(id);
      localStorage.setItem("guestId", id);
    }
  }, [guestId]);*/

  const token = user?.token;

  // fetch cart from backend
  const fetchCart = async () => {
    const query = user ? `userId=${user._id}` : `guestId=${''}`;
    try {
      const res = await fetch(`/api/cart?${query}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_CART", payload: data });
      }
    } catch (err) {
      console.error(err);
    }
  };

  /*useEffect(() => {
    if (guestId || user) fetchCart();
  }, [guestId, user]);*/

  // add/update cart
  const addToCart = async ({ product, size, color, quantity }) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
        body: JSON.stringify({
          productId: product._id,
          size,
          color,
          quantity,
          //guestId,
          userId: user?._id,
        }),
      });
      const data = await res.json();
      if (res.ok) dispatch({ type: "SET_CART", payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  return { cart, totalPrice, addToCart, fetchCart };
};
