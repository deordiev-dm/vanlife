import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/types";

export default function HostVanPricing() {
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
