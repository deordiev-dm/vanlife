import { Van } from "@/lib/types/types";
import VanProductCard from "./VanProductCard";
import { Link } from "react-router-dom";

type VansListSectionProps = {
  vans: Van[];
  userId: string;
};

export default function VansListSection({
  vans,
  userId,
}: VansListSectionProps) {
  const hostedVans = vans.filter((van) => van.hostId === userId);

  return (
    <div className="-mx-6 space-y-4 px-6 pb-8 pt-8 sm:mx-0">
      <h2 className="inline-block text-2xl font-bold transition-colors hover:text-orange-400">
        <Link to="vans">Your listed vans</Link>
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hostedVans?.map((van) => (
          <VanProductCard linkTo={`vans/${van._id}`} key={van._id} van={van} />
        ))}
      </div>
    </div>
  );
}
