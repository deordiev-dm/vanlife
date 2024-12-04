import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { Link } from "react-router-dom";

function HostedVanHeader() {
  return (
    <Link to=".." relative="path" className="group flex items-center gap-x-3">
      <ArrowLeftIcon className="h-5 w-5 transition group-hover:-translate-x-2" />
      <span className="nav-link">Back to all vans</span>
    </Link>
  );
}

export default HostedVanHeader;
