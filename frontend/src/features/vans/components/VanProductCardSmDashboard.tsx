import { Van } from "@/lib/types/types";
import { Link } from "react-router-dom";

export default function VanProductCardSmDashboard({ van }: { van: Van }) {
  return (
    <Link
      to={van._id}
      className="flex items-center gap-x-4 rounded-md bg-white p-3"
      key={van._id}
    >
      <img
        src={van.imageUrl}
        alt=""
        className="aspect-square w-28 rounded-md"
      />
      <div>
        <h3 className="text-xl font-semibold">{van.name}</h3>
        <div className="font-medium text-gray-500">${van.price}/day</div>
      </div>
    </Link>
  );
}
