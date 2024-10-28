import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import { getFirestore } from "firebase/firestore/lite";
import { Van } from "./types.ts";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage();

/**
 * Fetches a van by its ID from the backend API.
 *
 * @param id - The unique identifier of the van to fetch.
 * @returns A promise that resolves to a `Van` object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getVanById = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/vans/${id}`);

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
  const response = await fetch(`${BACKEND_URL}/api/users/${hostId}/hostVans`);

  if (!response.ok) {
    throw new Error("Failed to fetch host vans");
  }

  return (await response.json()) as Van[];
};

export const createVan = async (vanCreationData: Omit<Van, "_id">) => {
  const response = await fetch(`${BACKEND_URL}/api/vans`, {
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
  const response = await fetch(`${BACKEND_URL}/api/vans/${vanId}`, {
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

export type Transaction = {
  _id: string;
  sum: number;
  senderId: string;
  receiverId: string;
  vanId: string;
  createdAt: string;
};

/**
 * Fetches the transactions for a specific user.
 *
 * @param userId - The ID of the user whose transactions are to be fetched.
 * @returns A promise that resolves to an array of transactions.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getUserTransactions(userId: string) {
  const res = await fetch(
    `${BACKEND_URL}/api/users/${userId}/hostTransactions`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch host transactions");
  }

  return (await res.json()) as Transaction[];
}

export type Review = {
  _id: string;
  rate: 1 | 2 | 3 | 4 | 5;
  reviewBody?: string;
  reviewerId: string;
  vanId: string;
  van: Van;
  createdAt: string;
  updatedAt: string;
};

export async function getUserReviews(userId: string): Promise<Review[]> {
  const res = await fetch(`${BACKEND_URL}/api/users/${userId}/hostReviews`);

  if (!res.ok) {
    throw new Error("Failed to fetch host transactions");
  }

  return (await res.json()) as Review[];
}
