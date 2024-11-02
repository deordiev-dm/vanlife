const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Van } from "@/lib/types/types";

/**
 * Fetches a van by its ID from the backend API.
 *
 * @param id - The unique identifier of the van to fetch.
 * @returns A promise that resolves to a `Van` object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getVanById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/vans/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch van");
  }

  return (await response.json()) as Van;
};

/**
 * Fetches the vans associated with a specific host.
 *
 * @param hostId - The unique identifier of the host.
 * @returns A promise that resolves to an array of vans associated with the host.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHostVans = async (hostId: string) => {
  const response = await fetch(`${BASE_URL}/api/users/${hostId}/hostVans`);

  if (!response.ok) {
    throw new Error("Failed to fetch host vans");
  }

  return (await response.json()) as Van[];
};

export const createVan = async (vanCreationData: Omit<Van, "_id">) => {
  const response = await fetch(`${BASE_URL}/api/vans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vanCreationData),
  });

  if (!response.ok) {
    throw new Error("Failed to create a van");
  }

  const data = await response.json();
  const van = data.van;

  return van;
};

/**
 * Updates a van's details by sending a PUT request to the backend.
 *
 * @param {string} vanId - The unique identifier of the van to be updated.
 * @param {Partial<Van>} fieldToUpdate - An object containing the fields to be updated.
 * @returns {Promise<Van>} - A promise that resolves to the updated van object.
 * @throws {Error} - Throws an error if the update operation fails.
 */
export async function editVan(
  vanId: string,
  fieldToUpdate: Partial<Van>,
): Promise<Van> {
  const response = await fetch(`${BASE_URL}/api/vans/${vanId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fieldToUpdate),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed updating van: ${data.message}`);
  }

  const updatedVan = data.updatedVan as Van;
  return updatedVan;
}
