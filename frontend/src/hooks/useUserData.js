import { useEffect, useState } from "react";

export const useUserData = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      const token = JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        setError("No token found");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/users/profile", {
          method: "GET",
          headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch user data");

        setUser(data);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setIsLoading(true);
      }
    };

    fetchUserData();
  }, []);

  return { user, isLoading, error };
};
