import { Link } from "react-router-dom";
import { Van } from "@/lib/types/types";
import Badge from "@/components/ui/Badge";

type VanCardProps = {
  van: Van;
  prevSearchParams: string;
};

export default function VanProductCard({
  van,
  prevSearchParams,
}: VanCardProps) {
  return (
    <Link
      to={van._id}
      className="group flex flex-col space-y-3 rounded-xl bg-orange-100 text-slate-900 shadow-sm transition-colors hover:bg-orange-200"
      state={prevSearchParams}
    >
      <div className="min-h-80 flex-grow overflow-clip rounded-xl rounded-b-none">
        <img
          className="h-full w-full bg-orange-100 object-contain transition-transform duration-500 group-hover:scale-105"
          src={van.imageUrl}
          alt=""
        />
      </div>
      <div className="space-y-4 px-6 pb-8 pt-2">
        <h2 className="text-[1.75rem] font-bold">{van.name}</h2>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-medium">
            <span className="text-2xl font-bold">${van.price}</span>
            /day
          </div>
          <Badge type={van.type} />
        </div>
      </div>
    </Link>
  );
}
