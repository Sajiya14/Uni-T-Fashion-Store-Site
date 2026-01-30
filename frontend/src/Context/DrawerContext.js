import { createContext, useContext, useEffect, useRef, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openDrawer = () => setIsCartOpen(true);
  const closeDrawer = () => setIsCartOpen(false);
  const toggleDrawer = () => setIsCartOpen(prev => !prev);

  const  cartDrawerRef   = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDrawerRef.current && !cartDrawerRef.current.contains(event.target))
        setIsCartOpen(false);
    };
    
    document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DrawerContext.Provider value={{ isCartOpen,cartDrawerRef, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
