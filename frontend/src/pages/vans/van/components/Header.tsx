import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // save filters from "our vans" page
  const searchParams = location.state?.prevSearchParams || "";
  const typeFilter = searchParams.match(/type=([^&]+)/);

  return (
    <header className="mb-8">
      <Link
        to={`..?${searchParams}`}
        relative="path"
        className="group inline-flex items-center gap-x-2 px-3"
      >
        <ArrowLeftIcon className="h-5 w-5 transition group-hover:-translate-x-2" />
        <span className="nav-link group-hover:before:w-full">
          Back to {typeFilter ? typeFilter[1] : "all"} vans
        </span>
      </Link>
    </header>
  );
}

export default Header;
