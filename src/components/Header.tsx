import { NavLink, Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const activeStyles = {
    borderBottom: "1px solid #111827",
    color: "#111827",
  };

  function logOut() {
    localStorage.removeItem("isLoggedIn");
  }

  return (
    <header className="flex min-h-16 items-center justify-between bg-[#FFF7ED] px-6 py-4">
      <Link
        className="text-2xl font-black transition-all hover:drop-shadow-lg"
        to="."
      >
        #VANLIFE
      </Link>
      <nav className="flex items-center gap-x-2 font-semibold text-[#4d4d4d]">
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
        <NavLink
          className="transition-all hover:text-gray-900"
          to="login"
          style={(obj) => (obj.isActive ? activeStyles : undefined)}
        >
          Login
        </NavLink>
        <button
          onClick={logOut}
          className="group-[button]: h-8 w-8 rounded border p-1 transition-all hover:bg-orange-200"
        >
          <IoLogOutOutline className="h-full w-full stroke-black" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
