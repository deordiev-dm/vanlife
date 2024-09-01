import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const activeStyles = {
    textDecoration: "underline",
    color: "black",
  };

  return (
    <main className="space-y-5 px-6 pb-12 pt-6">
      <nav className="flex flex-wrap gap-3">
        <NavLink
          className="text-gray-600 hover:text-black"
          to="."
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className="text-gray-600 hover:text-gray-950"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
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
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </main>
  );
}
