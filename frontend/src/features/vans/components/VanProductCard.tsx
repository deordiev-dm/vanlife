import { Link } from "react-router-dom";
import { Van } from "@/lib/types/types";
import Badge from "@/components/ui/Badge";

type VanCardProps = {
  van: Van;
  prevSearchParams?: string;
  linkTo: string;
};

export default function VanProductCard({
  van,
  prevSearchParams,
  linkTo,
}: VanCardProps) {
  return (
    <Link
      to={linkTo}
      className="group flex flex-col overflow-hidden rounded-lg bg-orange-50 shadow-md ring-1 ring-gray-200 transition-all hover:bg-orange-100 hover:shadow-lg hover:ring-gray-300"
      state={{ prevSearchParams }}
    >
      <div className="relative overflow-hidden bg-gray-100">
        <img
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={van.imageUrl}
          alt={`${van.name} image`}
          loading="lazy"
        />
        <Badge type={van.type} className="absolute left-4 top-4 text-white" />
      </div>
      <div className="flex flex-col justify-between space-y-4 p-6">
        <h2 className="text-2xl font-extrabold text-gray-800">{van.name}</h2>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-700">
            <span className="text-2xl font-bold text-gray-900">
              ${van.price}
            </span>
            <span className="text-base font-medium"> /day</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
