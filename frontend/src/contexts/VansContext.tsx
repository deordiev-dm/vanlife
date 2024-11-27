import { createContext, useState } from "react";
import { type Van } from "../lib/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type VansContextType = {
  vans: Van[];
  setVans: React.Dispatch<React.SetStateAction<Van[]>>;
  fetchVans: () => Promise<void>;
  isLoading: boolean;
  error: unknown;
};

export const VansContext = createContext<VansContextType | null>(null);

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, ms);
  });
}

export function VansProvider({ children }: { children: React.ReactNode }) {
  const [vans, setVans] = useState<Van[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function fetchVans(): Promise<void> {
    setIsLoading(true);

    await sleep(500);

    try {
      console.info("Making a request to the database to fetch all vans");
      const res = await fetch(`${BASE_URL}/api/vans`);
      const data = await res.json();

      setVans(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VansContext.Provider
      value={{ vans, setVans, fetchVans, isLoading, error }}
    >
      {children}
    </VansContext.Provider>
  );
}
