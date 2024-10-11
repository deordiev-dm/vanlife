import { createContext, useState } from "react";
import { type Van } from "../utils/types";

type VansContextType = {
  vans: Van[];
  fetchVans: () => Promise<void>;
  isLoading: boolean;
  error: unknown;
};

export const VansContext = createContext<VansContextType | null>(null);

export function VansProvider({ children }: { children: React.ReactNode }) {
  const [vans, setVans] = useState<Van[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  /**
   * Fetches the list of vans from the database.
   *
   * This function makes an asynchronous request to the backend API to retrieve
   * all vans. It handles the loading state, error state, and updates the vans
   * state with the fetched data.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the fetch operation is complete.
   * @throws Will log an error to the console if the fetch operation fails.
   */
  async function fetchVans(): Promise<void> {
    setIsLoading(true);
    try {
      console.info("Making a request to the database to fetch all vans");
      const res = await fetch("http://localhost:3000/api/vans");
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
    <VansContext.Provider value={{ vans, fetchVans, isLoading, error }}>
      {children}
    </VansContext.Provider>
  );
}
