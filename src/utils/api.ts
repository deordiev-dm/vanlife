import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const db = getFirestore(app);
export const auth = getAuth(app);

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

export type TransactionType = {
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
    const transactions: TransactionType[] = querySnapshot.docs.map(
      (transaction) => transaction.data() as TransactionType,
    );
    return transactions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions");
  }
}

export type ReviewType = {
  hostId: string;
  rate: 1 | 2 | 3 | 4 | 5;
  reviewBody: string;
  reviewerName: string;
  timestamp: number;
  vanId: string;
};

export async function getReviews(userUid: string): Promise<ReviewType[]> {
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("hostId", "==", userUid));

  try {
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(
      (review) => review.data() as ReviewType,
    );

    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews");
  }
}

export async function addReview(review: ReviewType) {
  try {
    // Add a new document with the transaction data
    await addDoc(collection(db, "reviews"), review);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// const data: ReviewType[] = [
//   {
//     hostId: "gfnH3KDhGoWdLKbp4gnTQmLFlHu1",
//     rate: 5,
//     reviewBody: "lorem ipsum dolor sit amet.",
//     reviewerName: "Joe Schmoe",
//     timestamp: 1700314036000,
//     vanId: "1",
//   },
// ];

// data.forEach((item) => addReview(item));
