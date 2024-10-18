import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AuthRequired() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useAuth();

  const token = localStorage.getItem("token");
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/users/validate-token`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Unathorized");
        }

        const data = await response.json();

        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        // token is invalid or expired
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, setCurrentUser]);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isAuthenticated) {
    return <Outlet></Outlet>;
  }

  return (
    <Navigate
      replace
      state={{ message: "You must login first", pathname }}
      to="/login"
    />
  );
}
