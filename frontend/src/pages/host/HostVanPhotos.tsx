import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/types";

export default function HostVanPhotos() {
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
