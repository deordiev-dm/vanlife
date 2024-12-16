import getAllVans from "@/features/vans/api/getAllVans";
import VanProductCard from "@/features/vans/components/VanProductCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import NoMatchingOptions from "./NoMatchingOptions";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Van } from "@/lib/types/types";
import { useEffect } from "react";

function VanGrid({
  setTotalPages,
}: {
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type") as Pick<Van, "type"> | null;

  let page = Number(searchParams.get("page"));
  if (!page || page < 0) {
    page = 1;
  }

  const { data, isPending, error } = useQuery({
    queryKey: ["vans", page, typeFilter],
    queryFn: () => getAllVans(Number(page), typeFilter),
    staleTime: 600000, // 10min
  });

  useEffect(() => {
    if (data?.pageCount) {
      setTotalPages(data.pageCount);
    }
  }, [data?.pageCount, setTotalPages]);

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (data.vans.length === 0) {
    return <NoMatchingOptions />;
  }

  return (
    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.vans.map((van) => (
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
