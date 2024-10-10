import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

export type queryParamsType = {
  prop: string;
  equalTo: string;
};

/**
 * Fetches a list of vans from the Firestore database.
 *
 * @param {queryParamsType} [queryParams] - Optional query parameters to filter the vans.
 * @returns {Promise<Van[]>} A promise that resolves to an array of Van objects.
 * @throws {Error} Throws an error if fetching the vans data fails.
 */
export async function getVans(queryParams?: queryParamsType): Promise<Van[]> {
  const vansRef = collection(db, "vans");

  const q = queryParams
    ? query(vansRef, where(queryParams.prop, "==", queryParams.equalTo))
    : vansRef;

  try {
    const querySnapshot = await getDocs(q);
    const vans = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as Van,
    );

    return vans;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch vans data");
  }
}

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

/**
 * Fetches the transactions for a specific user from the Firestore database.
 *
 * @param {string} userUid - The unique identifier of the user whose transactions are to be fetched.
 * @returns {Promise<Transaction[]>} A promise that resolves to an array of transactions.
 * @throws {Error} If there is an error fetching the transactions.
 */
export async function getUserTransactions(userUid: string) {
  const transactionsRef = collection(db, "transactions");
  const q = query(transactionsRef, where("userId", "==", userUid));

  try {
    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = querySnapshot.docs.map(
      (transaction) => transaction.data() as Transaction,
    );
    return transactions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions");
  }
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

/**
 * Fetches user reviews from the Firestore database based on the provided user UID.
 *
 * @param {string} userUid - The UID of the user whose reviews are to be fetched.
 * @returns {Promise<Review[]>} A promise that resolves to an array of reviews.
 * @throws {Error} Throws an error if the reviews could not be fetched.
 */
export async function getUserReviews(userUid: string): Promise<Review[]> {
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("hostId", "==", userUid));

  try {
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(
      (review) => ({ ...review.data(), id: review.id }) as Review,
    );

    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews");
  }
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
