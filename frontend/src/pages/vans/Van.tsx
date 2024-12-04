import { Link, useParams, useLocation } from "react-router-dom";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import LoadingCard from "@/components/ui/LoadingCard";
import { useQuery } from "@tanstack/react-query";
import getVanById from "@/features/vans/api/getVanById";

export default function VanDetails() {
  const params = useParams();
  const location = useLocation();

  // save filters from "our vans" page
  const searchParams = location.state?.prevSearchParams || "";
  const typeFilter = searchParams.match(/type=([^&]+)/);

  // take van id from the address bar
  const vanId = params.id ?? "";

  const {
    data: van,
    isPending,
    error,
  } = useQuery({
    queryKey: ["van", vanId],
    queryFn: () => getVanById(vanId),
    staleTime: 1000 * 60 * 30, // 30 min
  });

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
            {isPending && <LoadingCard />}
            {van && !error && !isPending && (
              <>
                <div className="overflow-hidden rounded-md">
                  <img className="w-full" src={van.imageUrl} alt="" />
                </div>
                <div className="space-y-6 md:pt-4">
                  <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
                    {van.name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">
                      <span className="text-2xl font-bold">${van.price}</span>
                      /day
                    </div>
                    <Badge type={van.type} />
                  </div>
                  <p className="text-lg">{van.description}</p>
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
