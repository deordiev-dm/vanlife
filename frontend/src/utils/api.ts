import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
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

/**
 * Edits a van's data in the database.
 *
 * @param {string} vanId - The ID of the van to be updated.
 * @param {Partial<Van>} fieldToUpdate - An object containing the fields to update.
 * @returns {Promise<void>} - A promise that resolves when the van data has been successfully updated.
 * @throws {Error} - Throws an error if the van is not found or if the update fails.
 */
export async function editVan(
  vanId: string,
  fieldToUpdate: Partial<Van>,
): Promise<void> {
  const vansRef = collection(db, "vans");
  const q = query(vansRef, where("id", "==", vanId));

  try {
    const querySnapshot = await getDocs(q);
    const van = querySnapshot.docs[0];

    if (!van) {
      throw new Error("Van not found");
    }

    const vanData = van.data() as Van;
    const updatedVan = { ...vanData, ...fieldToUpdate };

    const result = await setDoc(doc(db, "vans", vanId), updatedVan);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit van data");
  }
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
