import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../../components/ui/ErrorPopup";
import { BecomeAHost } from "@/components/ui/BecomeAHost";
import VanProductCard from "@/features/vans/components/VanProductCard";
import LoadingCard from "@/components/ui/LoadingCard";
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

  const hostedVans = currentUser
    ? vans.filter((van) => van.hostId === currentUser._id)
    : [];

  return (
    <section className="space-y-5">
      <div className="mb-8 flex items-center gap-x-8">
        <h2 className="text-3xl font-bold">Your listed vans</h2>
        <Link
          to="add-van"
          className="rounded-lg bg-orange-500 px-5 py-1 text-lg font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Add New
        </Link>
      </div>
      {error && <ErrorMessage error={error} key={Date.now()} />}
      {!isPending && hostedVans.length > 0 ? (
        <div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hostedVans.map((van) => (
              <VanProductCard key={nanoid()} van={van} linkTo={van._id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      )}
      {!isPending && hostedVans.length === 0 && <BecomeAHost path="add-van" />}
    </section>
  );
}
