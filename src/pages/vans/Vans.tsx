import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Badge from "../../components/utility/Badge";
import { VanPreview } from "../../types.ts";
import { useVans } from "../../hooks/useVans.tsx";
import ErrorMessage from "../../components/utility/ErrorMessage.tsx";

export default function Vans() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const { vans, fetchVans } = useVans();

  function generateNewSearchParams(
    key: string,
    value: string | null,
  ): URLSearchParams {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }

    return newSearchParams;
  }

  useEffect(
    () => {
      if (!vans.length) {
        setIsLoading(true);
        fetchVans()
          .catch((err) => setError(err))
          .finally(() => setIsLoading(false));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
            <button
              onClick={() =>
                setSearchParams(generateNewSearchParams("type", "simple"))
              }
              className={`${typeFilter === "simple" ? "bg-orange-400" : "bg-orange-200"} rounded px-3 py-1 text-sm transition-colors`}
            >
              Simple
            </button>
            <button
              onClick={() =>
                setSearchParams(generateNewSearchParams("type", "rugged"))
              }
              className={`${typeFilter === "rugged" ? "bg-orange-400" : "bg-orange-200"} rounded px-3 py-1 text-sm transition-colors`}
            >
              Rugged
            </button>
            <button
              onClick={() =>
                setSearchParams(generateNewSearchParams("type", "luxury"))
              }
              className={`${typeFilter === "luxury" ? "bg-orange-400" : "bg-orange-200"} rounded px-3 py-1 text-sm transition-colors`}
            >
              Luxury
            </button>
            {typeFilter && (
              <button
                onClick={() =>
                  setSearchParams(generateNewSearchParams("type", null))
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
                key={van.id}
                id={van.id}
                imageUrl={van.imageUrl}
                name={van.name}
                price={van.price}
                type={van.type}
                state={{ searchParams: `${searchParams.toString()}` }}
              ></VanCard>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}

function VanCard(props: VanPreview) {
  return (
    <Link
      to={props.id}
      className="space-y-3 rounded-md p-3 shadow-sm transition-shadow hover:shadow-md"
      state={props.state}
    >
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover"
          src={props.imageUrl}
          alt=""
        />
      </div>
      <div className="flex justify-between gap-x-2">
        <h2 className="text-md font-semibold">{props.name}</h2>
        <div className="flex flex-col items-end">
          <span className="text-md font-semibold">${props.price}</span>
          <span className="text-sm font-medium">/day</span>
        </div>
      </div>
      <Badge type={props.type} />
    </Link>
  );
}
