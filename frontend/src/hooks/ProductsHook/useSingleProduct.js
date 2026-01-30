import { useState, useEffect } from "react";

export const useSingleProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:9000/api/products/${id}`);

        if (!res.ok) {
          if (res.status === 404) throw new Error("Product not found");
          else throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};
