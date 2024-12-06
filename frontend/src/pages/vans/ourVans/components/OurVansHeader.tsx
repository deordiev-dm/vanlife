import { useSearchParams } from "react-router-dom";
import VanFilter from "./VanFilter";

function OurVansHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  return (
    <div className="mb-8 space-y-6">
      <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Explore out van options
      </h1>
      <VanFilter
        typeFilter={typeFilter}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>
  );
}

export default OurVansHeader;
