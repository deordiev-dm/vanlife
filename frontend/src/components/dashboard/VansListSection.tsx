import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { Van } from "../../lib/types/types";

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
    <section className="space-y-5">
      <header className="flex justify-between gap-3">
        <h2 className="text-2xl font-bold">Your listed vans</h2>
        <Link to="vans" className="hover:underline">
          View all
        </Link>
      </header>
      <div className="space-y-3">
        {hostedVans?.map((van) => (
          <div
            key={nanoid()}
            className="flex items-center space-x-4 rounded bg-white px-6 py-4"
          >
            <img src={van.imageUrl} alt="" className="w-16 rounded-lg" />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{van.name}</h3>
              <p>${van.price}/day</p>
            </div>
            <Link to={`vans/${van._id}`} className="hover:underline">
              Edit
            </Link>
          </div>
        ))}
      </div>
      <Button as="a" to="vans/add-van" colors="orange">
        Add a new van
      </Button>
    </section>
  );
}
