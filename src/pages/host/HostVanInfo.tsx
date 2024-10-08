import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Badge from "../../components/utils/Badge";
import { useVans } from "../../hooks/useVans";
import ErrorMessage from "../../components/utils/ErrorMessage";

export default function HostVanInfo() {
  const activeStyles = {
    textDecoration: "underline",
    color: "black",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const params = useParams();

  const { vans, fetchVans } = useVans();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!vans.length) {
          await fetchVans();
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchVans, vans.length]);

  const displayedVan = vans.find((van) => van.id === params.id);

  if (error) {
    <ErrorMessage />;
  }

  if (!displayedVan || isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="space-y-6">
      <Link to=".." relative="path" className="flex items-center gap-x-3">
        <GoArrowLeft className="w-5 fill-[#858585]" />
        <span className="font-medium underline">Back to all vans</span>
      </Link>
      <section className="space-y-6 rounded-lg bg-white p-6">
        <div className="flex items-center gap-x-4">
          <img
            src={displayedVan.imageUrl}
            alt=""
            className="aspect-square w-40 rounded-md"
          />
          <div className="space-y-2">
            <Badge type={displayedVan.type} />
            <h1 className="text-2xl font-bold">{displayedVan.name}</h1>
            <p className="text-xl font-medium">
              <span className="text-lg">${displayedVan.price}/</span>day
            </p>
          </div>
        </div>

        <nav className="space-x-3">
          <NavLink
            className="text-gray-600 transition-colors hover:text-black"
            style={(obj) => (obj.isActive ? activeStyles : undefined)}
            to="."
            end
          >
            Details
          </NavLink>
          <NavLink
            className="text-gray-600 transition-colors hover:text-black"
            style={(obj) => (obj.isActive ? activeStyles : undefined)}
            to="pricing"
          >
            Pricing
          </NavLink>
          <NavLink
            className="text-gray-600 transition-colors hover:text-black"
            style={(obj) => (obj.isActive ? activeStyles : undefined)}
            to="photos"
          >
            Photos
          </NavLink>
        </nav>
        <section className="space-y-3">
          <Outlet context={{ displayedVan, fetchVans }} />
        </section>
      </section>
    </div>
  );
}
