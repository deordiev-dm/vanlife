import { NavLink, Link } from "react-router-dom";

function Header() {
  const activeStyles = {
    borderBottom: "1px solid #111827",
    color: "#111827",
  };

  return (
    <header className="flex min-h-16 items-center justify-between bg-[#FFF7ED] px-6 py-4">
      <Link
        className="text-2xl font-black transition-all hover:drop-shadow-lg"
        to="."
      >
        #VANLIFE
      </Link>
      <nav className="flex gap-x-3 font-semibold text-[#4d4d4d]">
        <NavLink
          className="transition-all hover:text-gray-900"
          to="/host"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
        >
          Host
        </NavLink>
        <NavLink
          className="transition-all hover:text-gray-900"
          to="about"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          end
        >
          About
        </NavLink>
        <NavLink
          className="transition-all hover:text-gray-900"
          to="vans"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
          end
        >
          Vans
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
