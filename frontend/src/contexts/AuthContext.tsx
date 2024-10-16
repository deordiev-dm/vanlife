import { createContext, useState } from "react";
import { type SignUpUser, type User } from "../utils/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthLoading: boolean;
  authError: unknown;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (newUser: SignUpUser) => Promise<void>;
  logOutUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<unknown>(null);

  const loginUser = async (email: string, password: string) => {
    setIsAuthLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token, user } = await response.json();

      localStorage.setItem("token", token);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
      setAuthError(error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const registerUser = async (newUser: SignUpUser) => {
    setIsAuthLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { user, token } = await response.json();

      localStorage.setItem("token", token);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthLoading,
        authError,
        loginUser,
        registerUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
