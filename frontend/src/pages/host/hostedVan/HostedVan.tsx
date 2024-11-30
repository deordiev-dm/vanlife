import { Link, NavLink, useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { nanoid } from "nanoid/non-secure";
import { Van } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";
import getVanById from "@/features/vans/api/getVanById";
import HostedVanDetails from "./HostedVanDetails";

const NAV_LINKS = [
  {
    to: ".",
    label: "Details",
    end: true,
  },
  {
    to: "pricing",
    label: "Pricing",
  },
  {
    to: "photos",
    label: "Photos",
  },
];

export default function HostedVan() {
  const params = useParams();

  // take van id from the address bar
  const vanId = params.id ?? "";

  const {
    data: van,
    isPending,
    error,
  } = useQuery({
    queryKey: ["van", vanId],
    queryFn: () => getVanById(vanId),
    staleTime: 1000 * 60 * 30, // 30 min
  });

  if (isPending) {
    return <span className="loader"></span>;
  }

  if (van === undefined) {
    return;
  }

  return (
    <div className="space-y-6">
      <Link to=".." relative="path" className="group flex items-center gap-x-3">
        <ArrowLeftIcon className="h-5 w-5 transition group-hover:-translate-x-2" />
        <span className="nav-link">Back to all vans</span>
      </Link>
      <section className="space-y-6">
        <HostedVanCard van={van} />
        <nav className="space-x-3">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={nanoid()}
              to={link.to}
              end={link.end}
              className={(obj) =>
                obj.isActive ? "nav-link _sm _active" : "nav-link _sm"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <section className="space-y-3">
          <HostedVanDetails van={van} />
        </section>
      </section>
      {error && <ErrorPopup error={error} />}
    </div>
  );
}

function HostedVanCard({ van }: { van: Van }) {
  return (
    <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-16">
      <div className="overflow-hidden rounded-md">
        <img className="w-full" src={van.imageUrl} alt="" />
      </div>
      <div className="space-y-6 md:pt-4">
        <h1 className="text-3xl font-bold lg:text-4xl">{van.name}</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-medium">
            <span className="text-2xl font-bold">${van.price}</span>
            /day
          </div>
          <Badge type={van.type} />
        </div>
        <p className="text-lg">{van.description}</p>
      </div>
    </div>
  );
}
