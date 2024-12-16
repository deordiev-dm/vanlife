import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getVanById from "@/features/vans/api/getVanById";
import HostedVanCard from "./components/HostedVanCard";
import HostedVanHeader from "./components/HostedVanHeader";
import Form from "./components/Form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import DeleteVan from "./components/DeleteVan";

export default function HostedVan() {
  const params = useParams();

  // take van id from the address bar
  const vanId = params.id ?? "";

  const {
    data: van,
    isPending,
    error,
  } = useQuery({
    queryKey: ["van", vanId],
    queryFn: () => getVanById(vanId),
    staleTime: 1000 * 60 * 30, // 30 min
  });

  return (
    <div className="space-y-8">
      <HostedVanHeader />
      {isPending && <span className="loader"></span>}
      {error && <ErrorMessage />}
      {van && (
        <>
          <HostedVanCard van={van} />
          <div className="rounded bg-white p-4">
            <h2 className="mb-6 text-3xl font-semibold">
              Edit Van Information
            </h2>
            <Form van={van} />
          </div>
          <DeleteVan van={van} />
        </>
      )}
    </div>
  );
}
