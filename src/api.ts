import { FirebaseError, initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";
import { Van } from "./types";

const firebaseConfig = {
  apiKey: "AIzaSyCI21SiRLKn_9lHh8rsS3zv9AtglrB8Xig",
  authDomain: "van-life-e28a4.firebaseapp.com",
  projectId: "van-life-e28a4",
  storageBucket: "van-life-e28a4.appspot.com",
  messagingSenderId: "740654481717",
  appId: "1:740654481717:web:05ba0423113a186d0c8c7c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getVans(): Promise<Van[]> {
  try {
    const vansCollection = await getDocs(collection(db, "vans"));
    const vans = vansCollection.docs.map(
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

type userData = {
  email: string;
  password: string;
};

export async function loginUser(creds: userData) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", creds.email));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const user = querySnapshot.docs[0].data();

    if (user.password !== creds.password) {
      throw new Error("Incorrect password");
    }
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error("Network or Firebase error:", err.message);
      throw new Error("Network error, please try again later.");
    } else if (err instanceof TypeError) {
      console.error("Login error:", err.message);
      throw err; // Re-throw to show specific login errors
    } else {
      throw err;
    }
  }
}
