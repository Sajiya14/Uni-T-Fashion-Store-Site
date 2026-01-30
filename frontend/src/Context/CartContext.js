import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

export const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
};

const calculateTotal = (cart) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload.cart || [],
        totalPrice: action.payload.totalPrice || 0,
      };

    case "ADD_ITEM": {
      const item = action.payload;

      // Check if the same product + size + color exists
      const index = state.cart.findIndex(
        (p) =>
          p.productId === item.productId &&
          p.size === item.size &&
          p.color === item.color
      );

      let updatedCart = [];

      if (index > -1) {
        // Increase quantity
        updatedCart = state.cart.map((p, i) =>
          i === index ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      } else {
        // Add new item
        updatedCart = [...state.cart, item];
      }

      return {
        ...state,
        cart: updatedCart,
        totalPrice: calculateTotal(updatedCart),
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter((p) => p._id !== action.id);
      return {
        ...state,
        cart: updatedCart,
        totalPrice: calculateTotal(updatedCart),
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
  }, [state.cart, state.totalPrice]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
