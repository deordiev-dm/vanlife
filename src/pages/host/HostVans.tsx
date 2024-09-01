import { useEffect, useState } from "react";
import { Van } from "../vans/Vans";
import { Link } from "react-router-dom";

export default function HostVans() {
  const [hostedVans, setHostedVans] = useState<Van[]>();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/host/vans");
      const data = await res.json();
      setHostedVans(data.vans);
    })();
  }, []);

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-bold">Your listed vans</h2>
      <section className="space-y-3">
        {hostedVans
          ? hostedVans.map((van) => (
              <Link
                to={`${van.id}`}
                className="flex items-center gap-x-4 rounded-md bg-white p-3"
                key={van.id}
              >
                <img
                  src={van.imageUrl}
                  alt=""
                  className="aspect-square w-28 rounded-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{van.name}</h3>
                  <div className="font-medium text-gray-500">
                    ${van.price}/day
                  </div>
                </div>
              </Link>
            ))
          : "Loading..."}
      </section>
    </section>
  );
}
