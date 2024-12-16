export default async function deleteVan(vanId: string) {
  return await fetch(`/api/vans/${vanId}`, {
    method: "DELETE",
  });
}
