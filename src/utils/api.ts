import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
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

export type Transaction = {
  amount: number;
  timestamp: number;
  userId: "string";
  vanId: "string";
};

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

export async function addReview(review: Review) {
  try {
    // Add a new document with the transaction data
    await addDoc(collection(db, "reviews"), review);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
