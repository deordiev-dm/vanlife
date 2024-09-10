import { createContext, useEffect, useState } from "react";
import { auth } from "../api";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
  currentUser: User | null;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  async function loginUser(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  const value = {
    currentUser,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
