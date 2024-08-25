import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex min-h-16 items-center justify-between bg-[#FFF7ED] px-6 py-4">
      <Link className="text-2xl font-black" to="/">
        #VANLIFE
      </Link>
      <nav className="flex gap-x-3 font-semibold text-[#4d4d4d]">
        <Link className="transition-colors hover:text-gray-900" to="/about">
          About
        </Link>
        <Link className="transition-colors hover:text-gray-900" to="/vans">
          Vans
        </Link>
      </nav>
    </header>
  );
}

export default Header;
