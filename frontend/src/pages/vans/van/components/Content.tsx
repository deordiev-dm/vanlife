import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loader from "@/components/ui/Loader";
import getVanById from "@/features/vans/api/getVanById";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function Content() {
  const params = useParams();

  // take van id from the address bar
  const vanId = params.id ?? "";

  const q = useQuery({
    queryKey: ["van", vanId],
    queryFn: () => getVanById(vanId),
    staleTime: 1000 * 60 * 30, // 30 min
  });

  if (q.isPending) {
    return <Loader />;
  }

  if (q.error) {
    return <ErrorMessage />;
  }

  const van = q.data;

  return (
    <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-16">
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
    </div>
  );
}

export default Content;
