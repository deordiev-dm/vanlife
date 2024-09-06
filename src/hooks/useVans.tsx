import { useContext } from "react";
import { VansContext } from "../contexts/VansContext";

export function useVans() {
  const context = useContext(VansContext);

  if (!context) {
    throw new Error("useVans must be used within a VansProvider");
  }

  return context;
}
