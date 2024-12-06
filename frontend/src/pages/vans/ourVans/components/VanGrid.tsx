import getAllVans from "@/features/vans/api/getAllVans";
import VanProductCard from "@/features/vans/components/VanProductCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import NoMatchingOptions from "./NoMatchingOptions";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";

function VanGrid() {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const { data, isPending, error } = useQuery({
    queryKey: ["vans"],
    queryFn: () => getAllVans(),
    staleTime: 600000, // 10min
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const vans = typeFilter
    ? data.filter((van) => van.type === typeFilter)
    : data;

  if (vans.length === 0) {
    return <NoMatchingOptions />;
  }

  return (
    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {vans.map((van) => (
        <VanProductCard
          key={van._id}
          linkTo={van._id}
          van={van}
          prevSearchParams={searchParams.toString()}
        ></VanProductCard>
      ))}
    </div>
  );
}

export default VanGrid;
