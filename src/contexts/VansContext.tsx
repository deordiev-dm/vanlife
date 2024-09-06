import { createContext, useState } from "react";
import { getVans } from "../api";
import { Van } from "../types";

export const VansContext = createContext<
  | {
      vans: Van[];
      fetchVans: () => Promise<void>;
    }
  | undefined
>(undefined);

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
