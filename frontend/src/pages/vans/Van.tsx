import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import Badge from "@/components/utils/Badge.tsx";
import Button from "@/components/utils/Button.tsx";

import { useVans } from "@/hooks/useVans.tsx";
import ErrorMessage from "@/components/utils/ErrorMessage.tsx";
import { getVanById } from "@/features/vans/database/vans";
import { type Van } from "@/lib/types/types";

export default function VanDetails() {
  const params = useParams();
  const location = useLocation();
  const searchParams = location.state?.searchParams || "";
  const typeFilter = searchParams.match(/type=([^&]+)/);

  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { vans } = useVans();
  const [displayedVan, setDisplayedVan] = useState<Van | undefined>(
    vans.find((van) => van._id == params.id),
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!displayedVan) {
        setIsLoading(true);
        try {
          if (params.id) {
            const van = await getVanById(params.id);
            setDisplayedVan(van);
          } else {
            throw new Error("No id has been provided");
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [displayedVan, params.id]);

  return (
    <main className="relative flex flex-col space-y-8 px-6 pb-12 pt-6">
      {error ? <ErrorMessage /> : null}
      {isLoading && <span className="loader"></span>}
      {!error && !isLoading && displayedVan && (
        <div className="flex max-w-xl flex-col items-start gap-y-6">
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
          <div className="overflow-hidden rounded-md">
            <img className="w-full" src={displayedVan.imageUrl} alt="" />
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
        </div>
      )}
    </main>
  );
}
