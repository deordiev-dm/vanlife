import { useAuth } from "../../hooks/useAuth";
import { BecomeAHost } from "@/components/ui/BecomeAHost";
import VanProductCard from "@/features/vans/components/VanProductCard";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getHostVans from "@/features/vans/api/getHostVans";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function HostedVans() {
  return (
    <div className="space-y-5">
      <Header />
      <Grid />
    </div>
  );
}

function Header() {
  return (
    <header className="mb-8 flex items-center justify-between gap-x-8">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Your Listed Vans
      </h1>
      <Link
        to="add-van"
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-2 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
      >
        Add New
      </Link>
    </header>
  );
}

function Grid() {
  const { currentUser } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: ["vans", "host", currentUser],
    queryFn: () => getHostVans(currentUser?._id || ""),
    staleTime: Infinity,
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((van) => (
          <VanProductCard key={nanoid()} van={van} linkTo={van._id} />
        ))}
      </div>
      {!isPending && data.length === 0 && <BecomeAHost path="add-van" />}
    </>
  );
}
