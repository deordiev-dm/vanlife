const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default async function deleteVan(vanId: string) {
  return await fetch(`${VITE_BACKEND_URL}/api/vans/${vanId}`, {
    method: "DELETE",
  });
}
