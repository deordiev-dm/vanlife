import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import Badge from "../../components/utility/Badge";
import Button from "../../components/utility/Button";

import { useVans } from "../../hooks/useVans.tsx";
import LoadingError from "../../errors.ts";
import ErrorMessage from "../../components/utility/ErrorMessage.tsx";

export default function VanDetails() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoadingError | null>(null);

  const location = useLocation();
  const searchParams = location.state?.searchParams || "";
  const typeFilter = searchParams.match(/type=([^&]+)/);

  const { vans, fetchVans } = useVans();

  useEffect(() => {
    if (!vans.length) {
      setIsLoading(true);
      fetchVans()
        .catch((error) => setError(error))
        // .finally(() => setTimeout(() => setIsLoading(false), 3000));
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedVan = vans.find((van) => van.id == params.id);

  return (
    <main className="relative flex flex-col space-y-8 px-6 pb-12 pt-6">
      {error ? <ErrorMessage /> : null}
      {isLoading && <span className="loader"></span>}
      {!error && !isLoading && displayedVan && (
        <>
          <Link
            to={`..?${searchParams}`}
            relative="path"
            className="flex items-center gap-x-3"
          >
            <GoArrowLeft className="w-5 fill-[#858585]" />
            <span className="font-medium underline">
              Back to {typeFilter ? typeFilter[1] : "all"} vans
            </span>
          </Link>
          <div className="aspect-square overflow-hidden rounded-md">
            <img src={displayedVan.imageUrl} alt="" />
          </div>
          <div className="space-y-5">
            <Badge type={displayedVan.type} />
            <h1 className="text-3xl font-bold">{displayedVan.name}</h1>
            <p className="text-xl font-medium">
              <span className="text-2xl">${displayedVan.price}/</span>day
            </p>
            <p className="font-medium">{displayedVan.description}</p>
            <Button as="button" colors="orange">
              Rent this van
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
