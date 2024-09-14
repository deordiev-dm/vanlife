import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
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

