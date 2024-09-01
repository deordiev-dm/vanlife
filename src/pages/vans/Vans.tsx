import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../components/utility/Badge";

export type Van = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: "simple" | "rugged" | "luxury";
};

type VanPreview = Omit<Van, "description">;

export default function Vans() {
  const [vansList, setVansList] = useState<Van[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/vans");
      const data: { vans: Van[] } = await res.json();

      setVansList(data.vans);
    }

    getData();
  }, []);

  return (
    <main className="px-6 pb-12 pt-6">
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3">
        {vansList.map((van) => (
          <VanCard
            key={van.id}
            id={van.id}
            imageUrl={van.imageUrl}
            name={van.name}
            price={van.price}
            type={van.type}
          ></VanCard>
        ))}
      </div>
    </main>
  );
}

function VanCard(props: VanPreview) {
  return (
    <Link
      to={`/vans/${props.id}`}
      className="space-y-3 rounded-md p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover"
          src={props.imageUrl}
          alt=""
        />
      </div>
      <div className="flex justify-between gap-x-2">
        <h2 className="text-md font-semibold">{props.name}</h2>
        <div className="flex flex-col items-end">
          <span className="text-md font-semibold">${props.price}</span>
          <span className="text-sm font-medium">/day</span>
        </div>
      </div>
      <Badge type={props.type} />
    </Link>
  );
}
