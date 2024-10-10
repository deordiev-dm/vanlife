import { NavLink, Outlet, useSearchParams } from "react-router-dom";

export default function HostLayout() {
  const activeStyles = {
    textDecoration: "underline",
    color: "black",
    pointerEvents: "none" as const,
  };

  const [searchParams, _] = useSearchParams();
  const monthsFilter = Number(searchParams.get("months")) || 3;

  return (
    <main className="space-y-5 px-6 pb-12 pt-6">
      <nav className="flex flex-wrap gap-3">
        <NavLink
          className="text-gray-600 hover:text-black"
          to="."
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          state={{ monthsFilter }}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className="text-gray-600 hover:text-gray-950"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          state={{ monthsFilter }}
          to="income"
        >
          Income
        </NavLink>
        <NavLink
          className="text-gray-600 hover:text-gray-950"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          to="vans"
        >
          Vans
        </NavLink>
        <NavLink
          className="text-gray-600 hover:text-gray-950"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          state={{ monthsFilter }}
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </main>
  );
}
