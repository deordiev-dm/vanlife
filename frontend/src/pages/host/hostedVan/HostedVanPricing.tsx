import { useOutletContext } from "react-router-dom";
import { Van } from "@/lib/types/types";

export default function HostedVanPricing() {
  const { displayedVan } = useOutletContext<{ displayedVan: Van }>();

  if (!displayedVan) return <div className="loader"></div>;

  return (
    <>
      <p>
        <span className="text-lg font-semibold">${displayedVan.price}</span>/day
      </p>
    </>
  );
}
