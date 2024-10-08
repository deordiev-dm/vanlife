import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVans } from "../../hooks/useVans";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../../components/utils/ErrorMessage";
import Button from "../../components/utils/Button";

export default function HostVans() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { vans, fetchVans } = useVans();

  useEffect(() => {
    if (!vans.length) {
      setIsLoading(true);
      fetchVans()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [fetchVans, vans.length]);

  const hostedVans = currentUser
    ? vans.filter((van) => van.hostId === currentUser.uid)
    : [];

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-bold">Your listed vans</h2>
      <div className="space-y-3">
        {isLoading && <div className="loader"></div>}
        {error && <ErrorMessage />}
        {hostedVans.map((van) => (
          <Link
            to={van.id}
            className="flex items-center gap-x-4 rounded-md bg-white p-3"
            key={van.id}
          >
            <img
              src={van.imageUrl}
              alt=""
              className="aspect-square w-28 rounded-md"
            />
            <div>
              <h3 className="text-xl font-semibold">{van.name}</h3>
              <div className="font-medium text-gray-500">${van.price}/day</div>
            </div>
          </Link>
        ))}
        <Button as="a" to="add-van" colors="orange">
          Add a new van
        </Button>
      </div>
    </section>
  );
}
