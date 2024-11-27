import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import { useVans } from "@/hooks/useVans";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { nanoid } from "nanoid/non-secure";
import { Van } from "@/lib/types/types";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();

  const { vans, fetchVans } = useVans();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!vans.length) {
          await fetchVans();
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchVans, vans.length]);

  const displayedVan = vans.find((van) => van._id === params.id);

  if (!displayedVan || isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="space-y-6">
      <Link to=".." relative="path" className="group flex items-center gap-x-3">
        <ArrowLeftIcon className="h-5 w-5 transition group-hover:-translate-x-2" />
        <span className="nav-link">Back to all vans</span>
      </Link>
      <section className="space-y-6">
        <HostedVanCard van={displayedVan} />
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
          <Outlet context={{ displayedVan }} />
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
