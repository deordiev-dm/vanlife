import { useEffect, useState } from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

import { useVans } from "@/hooks/useVans.tsx";
import generateNewSearchParams from "@/lib/utils/generateNewSearchParams";

import LoadingCard from "@/components/ui/LoadingCard";
import XMarkIcon from "@/components/icons/XMarkIcon";
import ErrorPopup from "@/components/ui/ErrorPopup";

import VanProductCard from "@/features/vans/components/VanProductCard";

const FILTER_OPTIONS = ["simple", "rugged", "luxury"];

export default function VansCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const [isModalOpen, setModalOpen] = useState(false);
  const { vans, fetchVans, isLoading, error } = useVans();

  useEffect(() => {
    if (!vans.length) {
      fetchVans();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      setModalOpen(true);
    }
  }, [error]);

  const displayedVans = typeFilter
    ? vans?.filter((van) => van.type === typeFilter)
    : vans;

  const emptyArray = new Array(6).fill(null);

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
        {isModalOpen && <ErrorPopup setModalOpen={setModalOpen} />}

        {!displayedVans.length && !isLoading && !error && (
          <p className="text-2xl font-medium text-orange-600">
            No vans match your search
          </p>
        )}

        {isLoading &&
          !error &&
          emptyArray.map((_, i) => <LoadingCard key={i} />)}

        {!isLoading &&
          !error &&
          displayedVans.length > 0 &&
          displayedVans.map((van) => (
            <VanProductCard
              key={van._id}
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
