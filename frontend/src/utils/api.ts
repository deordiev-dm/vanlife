import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import {
  addDoc,
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
  amount: number;
  timestamp: number;
  userId: "string";
  vanId: "string";
};

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
  hostId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  reviewBody: string;
  reviewerName: string;
  timestamp: number;
  vanId: string;
  id: string;
};

export async function getUserReviews(userId: string): Promise<Review[]> {
  const res = await fetch(`${BACKEND_URL}/api/users/${userId}/hostReviews`);

  if (!res.ok) {
    throw new Error("Failed to fetch host transactions");
  }

  return (await res.json()) as Review[];
}

/**
 * Adds a review to the "reviews" collection in the database.
 *
 * @param {Review} review - The review object to be added.
 * @throws {Error} Throws an error if the review could not be added.
 * @returns {Promise<void>} A promise that resolves when the review is successfully added.
 */
export async function addReview(review: Review) {
  try {
    await addDoc(collection(db, "reviews"), review);
  } catch (err) {
    console.error("Error adding document: ", err);
    throw new Error("Failed to add review");
  }
}
