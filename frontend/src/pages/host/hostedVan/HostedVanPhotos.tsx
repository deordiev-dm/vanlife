import { useOutletContext } from "react-router-dom";
import { Van } from "@/lib/types/types";

export default function HostedVanPhotos() {
  const { displayedVan } = useOutletContext<{ displayedVan: Van }>();

  if (!displayedVan) return <div className="loader"></div>;

  return (
    <>
      <img
        src={displayedVan.imageUrl}
        className="w-[6.25rem] rounded-md"
        alt=""
      />
    </>
  );
}
