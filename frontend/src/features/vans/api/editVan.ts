import { Van } from "@/lib/types/types";

export async function editVan(
  vanId: string,
  fieldsToUpdate: Partial<Van>,
): Promise<Van> {
  const response = await fetch(`/api/vans/${vanId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fieldsToUpdate),
  });

  const data = await response.json();

  if (response.status === 400) {
    throw new Error(
      "The data provided is invalid and couldn't be saved. Please review your input and try again.",
    );
  }

  if (response.status === 500) {
    throw new Error("Something went wrong on our end. Please try again later.");
  }

  const updatedVan = data.updatedVan as Van;
  return updatedVan;
}
