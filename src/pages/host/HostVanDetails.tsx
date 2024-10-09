import { useOutletContext } from "react-router-dom";
import { type Van } from "../../utils/types";
import { FaEdit } from "react-icons/fa";

type VanDetailFieldProps = {
  label: string;
  value: string;
};

export default function HostVanDetails() {
  const { displayedVan } = useOutletContext<{ displayedVan: Van }>();

  if (!displayedVan) return <div className="loader"></div>;

  return (
    <>
      <VanDetailField label="Name" value={displayedVan.name} />
      <VanDetailField label="Category" value={displayedVan.type} />
      <VanDetailField label="Description" value={displayedVan.description} />
    </>
  );
}

function VanDetailField({ label, value }: VanDetailFieldProps) {
  return (
    <div className="flex items-start justify-between gap-x-2">
      <span>
        <span className="font-semibold">{label}: </span>
        <span>{value}</span>
      </span>
      <button
        type="button"
        className="rounded border p-1 transition-colors hover:bg-orange-400"
      >
        <FaEdit className="h-6 w-6" />
      </button>
    </div>
  );
}
