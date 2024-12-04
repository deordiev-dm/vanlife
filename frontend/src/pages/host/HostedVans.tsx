import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../../components/ui/ErrorPopup";
import { BecomeAHost } from "@/components/ui/BecomeAHost";
import VanProductCard from "@/features/vans/components/VanProductCard";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getHostVans from "@/features/vans/api/getHostVans";

export default function HostedVans() {
  const { currentUser } = useAuth();

  const {
    data: vans,
    isPending,
    error,
  } = useQuery({
    queryKey: ["hostVans", currentUser],
    queryFn: () => getHostVans(currentUser?._id || ""),
    staleTime: Infinity,
  });

  if (isPending) {
    return <span className="loader"></span>;
  }

  if (vans === undefined) {
    return;
  }

  return (
    <section className="space-y-5">
      <div className="mb-8 flex items-center justify-between gap-x-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Your Listed Vans
        </h1>
        <Link
          to="add-van"
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-2 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
        >
          Add New
        </Link>
      </div>

      <div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vans.map((van) => (
            <VanProductCard key={nanoid()} van={van} linkTo={van._id} />
          ))}
        </div>
      </div>
      {error && <ErrorMessage error={error} key={Date.now()} />}
      {!isPending && vans.length === 0 && <BecomeAHost path="add-van" />}
    </section>
  );
}
