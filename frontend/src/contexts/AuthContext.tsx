import { createContext, useState } from "react";
import { type SignUpUser, type User } from "../lib/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
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

  const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("No such user found. Please, try again");
    }

    const { token, user } = await response.json();

    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  const registerUser = async (newUser: SignUpUser) => {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
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

        loginUser,
        registerUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
