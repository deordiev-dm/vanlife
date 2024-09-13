import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/types";

export default function HostVanDetails() {
  const { displayedVan } = useOutletContext<{ displayedVan: Van }>();

  if (!displayedVan) return <div className="loader"></div>;

  return (
    <>
      <p>
        <span className="font-semibold">Name:</span> {displayedVan.name}
      </p>
      <p className="capitalize">
        <span className="font-semibold">Category:</span> {displayedVan.type}
      </p>
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {displayedVan.description}
      </p>
      <p>
        <span className="font-semibold">Visibility:</span> public
      </p>
    </>
  );
}
