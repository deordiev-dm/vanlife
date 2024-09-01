import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Van } from "../vans/Vans";
import Badge from "../../components/utility/Badge";

export default function HostVanInfo() {
  const params = useParams();
  const [vanInfo, setVanInfo] = useState<Van>();

  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/vans/${params.id}`);
      const data = await res.json();

      setVanInfo(data.vans);
    }

    getData();
  }, []);

  const activeStyles = {
    textDecoration: "underline",
    color: "black",
  };

  if (!vanInfo) return;
  return (
    <div className="space-y-6">
      <Link to=".." relative="path" className="flex items-center gap-x-3">
        <GoArrowLeft className="w-5 fill-[#858585]" />
        <span className="font-medium underline">Back to all vans</span>
      </Link>
      <section className="space-y-6 rounded-lg bg-white p-6">
        <div className="flex items-center gap-x-4">
          <img
            src={vanInfo?.imageUrl}
            alt=""
            className="aspect-square w-40 rounded-md"
          />
          <div className="space-y-2">
            <Badge type={vanInfo.type} />
            <h1 className="text-2xl font-bold">{vanInfo.name}</h1>
            <p className="text-xl font-medium">
              <span className="text-lg">${vanInfo.price}/</span>day
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
          <Outlet context={[vanInfo, setVanInfo]} />
        </section>
      </section>
    </div>
  );
}
