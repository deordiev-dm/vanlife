import { Van } from "@/lib/types/types";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createVan = async (vanCreationData: Omit<Van, "_id">) => {
  const response = await fetch(`${VITE_BACKEND_URL}/api/vans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vanCreationData),
  });

  if (response.status === 400) {
    throw new Error(
      "The data provided is invalid and couldn't be saved. Please review your input and try again.",
    );
  }

  if (response.status === 500) {
    throw new Error("Something went wrong on our end. Please try again later.");
  }

  const data = await response.json();
  const van = data.van;

  return van;
};
