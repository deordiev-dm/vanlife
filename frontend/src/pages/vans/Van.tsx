import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { useVans } from "@/hooks/useVans.tsx";
import ErrorMessage from "@/components/ui/ErrorPopup";
import { getVanById } from "@/features/vans/database/vans";
import { type Van } from "@/lib/types/types";
import LoadingCard from "@/components/ui/LoadingCard";

export default function VanDetails() {
  const params = useParams();
  const location = useLocation();
  const searchParams = location.state?.searchParams || "";
  const typeFilter = searchParams.match(/type=([^&]+)/);

  const [isModalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    if (error) {
      setModalOpen(true);
    }
  }, [error]);

  return (
    <main>
      <div className="container relative pb-16 pt-24 md:pt-32">
        <div className="space-y-8">
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

          <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-16">
            {isModalOpen && <ErrorMessage setModalOpen={setModalOpen} />}
            {isLoading && <LoadingCard />}
            {displayedVan && !error && !isLoading && (
              <>
                <div className="overflow-hidden rounded-md">
                  <img className="w-full" src={displayedVan.imageUrl} alt="" />
                </div>
                <div className="space-y-6 md:pt-4">
                  <h1 className="text-3xl font-bold lg:text-4xl">
                    {displayedVan.name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">
                      <span className="text-2xl font-bold">
                        ${displayedVan.price}
                      </span>
                      /day
                    </div>
                    <Badge type={displayedVan.type} />
                  </div>
                  <p className="text-lg">{displayedVan.description}</p>
                  <Button as="button">Rent this van</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
