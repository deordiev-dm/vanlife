import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import generateNewSearchParams from "@/lib/utils/generateNewSearchParams";
import LoadingCard from "@/components/ui/LoadingCard";
import XMarkIcon from "@/components/icons/XMarkIcon";
import ErrorPopup from "@/components/ui/ErrorPopup";
import VanProductCard from "@/features/vans/components/VanProductCard";
import { useQuery } from "@tanstack/react-query";
import getAllVans from "@/features/vans/api/getAllVans";

const FILTER_OPTIONS = ["simple", "rugged", "luxury"];

export default function VansCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const {
    data: vans,
    isPending,
    error,
  } = useQuery({
    queryKey: ["vans"],
    queryFn: () => getAllVans(),
    staleTime: 600000, // 10min
  });

  if (!vans) {
    return;
  }

  const displayedVans = typeFilter
    ? vans?.filter((van) => van.type === typeFilter)
    : vans;

  return (
    <main className="container pb-12 pt-28">
      <div className="mb-8 space-y-6">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Explore out van options
        </h1>
        <VanFilterPanel
          typeFilter={typeFilter}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>
      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {error && <ErrorPopup error={error} />}

        {!displayedVans.length && !isPending && !error && (
          <p className="text-2xl font-medium text-orange-600">
            No vans match your search
          </p>
        )}

        {isPending &&
          !error &&
          new Array(6).fill(null).map((_, i) => <LoadingCard key={i} />)}

        {!isPending &&
          !error &&
          displayedVans.length > 0 &&
          displayedVans.map((van) => (
            <VanProductCard
              key={van._id}
              linkTo={van._id}
              van={van}
              prevSearchParams={searchParams.toString()}
            ></VanProductCard>
          ))}
      </div>
    </main>
  );
}

type VanFilterPanelProps = {
  typeFilter: string | null;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

function VanFilterPanel({
  typeFilter,
  setSearchParams,
  searchParams,
}: VanFilterPanelProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <FilterButton
          key={option}
          typeFilter={typeFilter}
          onClick={() =>
            setSearchParams(
              generateNewSearchParams(searchParams, "type", option),
            )
          }
          filterOption={option}
        >
          {option}
        </FilterButton>
      ))}

      {typeFilter && (
        <FilterButton
          typeFilter=""
          filterOption=""
          onClick={() =>
            setSearchParams(generateNewSearchParams(searchParams, "type", null))
          }
        >
          <div className="flex items-center gap-x-1">
            <XMarkIcon className="h-5 w-5" />
            <span>Clear filters</span>
          </div>
        </FilterButton>
      )}
    </div>
  );
}

type FilterButtonProps = {
  filterOption: string;
  typeFilter: string | null;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterButton({
  filterOption,
  typeFilter,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${typeFilter === filterOption ? "bg-orange-600" : "bg-orange-400"} rounded-2xl px-4 py-2 capitalize text-white transition-colors hover:bg-orange-500`}
    >
      {children}
    </button>
  );
}
