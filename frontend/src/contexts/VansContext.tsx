import { createContext, useState } from "react";
import { type Van } from "../lib/types/types";

type VansContextType = {
  vans: Van[];
  setVans: React.Dispatch<React.SetStateAction<Van[]>>;
  fetchVans: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
};

export const VansContext = createContext<VansContextType | null>(null);

export function VansProvider({ children }: { children: React.ReactNode }) {
  const [vans, setVans] = useState<Van[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchVans(): Promise<void> {
    // todo: delete this function
    // setIsLoading(true);

    // try {
    //   console.info("Making a request to the database to fetch all vans");
    //   const res = await fetch("/api/vans");
    //   const data = await res.json();

    //   setVans(data);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error(error);
    //     setError(error);
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
    throw new Error("Use React Query to fetch vans.");
  }

  return (
    <VansContext.Provider
      value={{ vans, setVans, fetchVans, isLoading, error }}
    >
      {children}
    </VansContext.Provider>
  );
}
