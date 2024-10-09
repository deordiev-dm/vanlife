import { createContext, useState } from "react";
import { getVans, queryParamsType } from "../utils/api";
import { Van } from "../utils/types";

type VansContextType = {
  vans: Van[];
  fetchVans: (queryParams?: queryParamsType) => Promise<void>;
  isAllVansFetched: boolean;
  setIsAllVansFetched: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VansContext = createContext<VansContextType | null>(null);

export function VansProvider({ children }: { children: React.ReactNode }) {
  const [vans, setVans] = useState<Van[]>([]);
  const [isAllVansFetched, setIsAllVansFetched] = useState(false);

  /**
   * Fetches a list of vans based on the provided query parameters and updates the state with the fetched data.
   *
   * @param {queryParamsType} [queryParams] - Optional query parameters to filter the vans.
   * @returns {Promise<void>} A promise that resolves when the vans data has been fetched and the state has been updated.
   */
  async function fetchVans(queryParams?: queryParamsType) {
    const data = await getVans(queryParams);
    setVans(data);
  }

  return (
    <VansContext.Provider
      value={{ vans, fetchVans, isAllVansFetched, setIsAllVansFetched }}
    >
      {children}
    </VansContext.Provider>
  );
}
