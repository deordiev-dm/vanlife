import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Badge from "../../components/utils/Badge.tsx";
import { useVans } from "../../hooks/useVans.tsx";
import ErrorMessage from "../../components/utils/ErrorMessage.tsx";
import generateNewSearchParams from "../../utils/generateNewSearchParams.ts";
import { Van } from "../../utils/types.ts";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const { vans, fetchVans, isLoading, error } = useVans();

  useEffect(() => {
    if (!vans.length) {
      fetchVans();
    }
  }, []);

  const displayedVans = typeFilter
    ? vans?.filter((van) => van.type === typeFilter)
    : vans;

  return (
    <main className="relative flex flex-col px-6 pb-12 pt-6">
      {error ? <ErrorMessage /> : null}
      {isLoading && <span className="loader"></span>}
      {!error && !isLoading ? (
        <>
          <h1 className="mb-5 text-3xl font-bold">Explore out van options</h1>
          <div className="mb-5 space-x-3">
            <FilterButton filterOption="simple" />
            <FilterButton filterOption="rugged" />
            <FilterButton filterOption="luxury" />
            {typeFilter && (
              <button
                onClick={() =>
                  setSearchParams(
                    generateNewSearchParams(searchParams, "type", null),
                  )
                }
                className="text-sm text-gray-600 underline"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3">
            {displayedVans.map((van) => (
              <VanCard
                key={van._id}
                van={van}
                prevSearchParams={searchParams.toString()}
              ></VanCard>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );

  function FilterButton({ filterOption }: { filterOption: string }) {
    return (
      <button
        onClick={() =>
          setSearchParams(
            generateNewSearchParams(searchParams, "type", filterOption),
          )
        }
        className={`${typeFilter === filterOption ? "bg-orange-400" : "bg-orange-200"} rounded px-3 py-1 text-sm transition-colors`}
      >
        {filterOption}
      </button>
    );
  }
}

type VanCardProps = {
  van: Van;
  prevSearchParams: string;
};

function VanCard({ van, prevSearchParams }: VanCardProps) {
  return (
    <Link
      to={van._id}
      className="space-y-3 rounded-md p-3 shadow-sm transition-shadow hover:shadow-md"
      state={prevSearchParams}
    >
      <div className="aspect-square overflow-hidden rounded-md">
        <img className="h-full w-full object-cover" src={van.imageUrl} alt="" />
      </div>
      <div className="flex justify-between gap-x-2">
        <h2 className="text-md font-semibold">{van.name}</h2>
        <div className="flex flex-col items-end">
          <span className="text-md font-semibold">${van.price}</span>
          <span className="text-sm font-medium">/day</span>
        </div>
      </div>
      <Badge type={van.type} />
    </Link>
  );
}
