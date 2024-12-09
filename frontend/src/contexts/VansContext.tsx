import { createContext, useState } from "react";
import { type Van } from "../lib/types/types";

type VansContextType = {
  vans: Van[];
  setVans: React.Dispatch<React.SetStateAction<Van[]>>;
};

export const VansContext = createContext<VansContextType | null>(null);

export function VansProvider({ children }: { children: React.ReactNode }) {
  const [vans, setVans] = useState<Van[]>([]);

  return (
    <VansContext.Provider value={{ vans, setVans }}>
      {children}
    </VansContext.Provider>
  );
}
