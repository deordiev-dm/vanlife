import React from "react";
import AuthProvider from "./AuthContext";
import { VansProvider } from "./VansContext";

export default function CombinedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <VansProvider>{children}</VansProvider>
    </AuthProvider>
  );
}
