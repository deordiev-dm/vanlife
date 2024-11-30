import { Van } from "@/lib/types/types";

const getHostVans = async (hostId: string) => {
  const response = await fetch(`/api/users/${hostId}/hostVans`);

  if (!response.ok) {
    throw new Error("Failed to get host vans");
  }

  return (await response.json()) as Van[];
};

export default getHostVans;
