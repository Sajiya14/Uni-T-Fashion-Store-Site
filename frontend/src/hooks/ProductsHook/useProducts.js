// hooks/useProducts.js
import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/products"); // fetch all products
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};
