import { createContext, useState } from "react";
import { getVans } from "../utils/api";
import { Van } from "../utils/types";

type VansContextType = {
  vans: Van[];
  fetchVans: () => Promise<void>;
};

export const VansContext = createContext<VansContextType | null>(null);

export function VansProvider({ children }: { children: React.ReactNode }) {
  const [vans, setVans] = useState<Van[]>([]);

  async function fetchVans() {
    const data = await getVans();
    setVans(data);
  }

  return (
    <VansContext.Provider value={{ vans, fetchVans }}>
      {children}
    </VansContext.Provider>
  );
}
