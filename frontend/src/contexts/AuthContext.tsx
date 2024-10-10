import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/api";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
  currentUser: User | null;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  logOutUser: () => Promise<void>;
  authLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  async function loginUser(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function createUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async function logOutUser() {
    return await signOut(auth);
  }

  const value = {
    currentUser,
    loginUser,
    createUser,
    logOutUser,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
