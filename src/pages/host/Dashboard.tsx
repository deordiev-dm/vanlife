import { useEffect } from "react";
import { useVans } from "../../hooks/useVans";
import { useAuth } from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa6";
import NoVans from "../../components/NoVans";

export default function Dashboard() {
  const { vans, fetchVans } = useVans();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    if (!vans.length) {
      fetchVans({ prop: "hostId", equalTo: currentUser?.uid })
        .catch((err) => console.error(err))
        .finally();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hostedVans = currentUser
    ? vans.filter((van) => van.hostId === currentUser.uid)
    : null;

  return hostedVans?.length ? (
    <>
      <div>
        <section className="-ml-6 -mr-6 space-y-5 bg-[#FFEAD0] p-6">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <div className="flex justify-between gap-4">
            <p className="text-[#4d4d4d]">
              Income in the{" "}
              <span className="font-semibold underline">last 30 days</span>
            </p>
            <button>Details</button>
          </div>
          <p className="text-4xl font-extrabold">$2,260</p>
        </section>
        <section className="-ml-6 -mr-6 flex justify-between gap-4 bg-[#FFDDB2] p-6">
          <h2 className="flex text-2xl font-bold">
            Review score{" "}
            <span className="flex items-center pl-2 text-lg font-bold">
              <FaStar className="mr-1 fill-orange-500" />
              5.0<span className="font-normal text-[#4d4d4d]">/5</span>
            </span>
          </h2>
          <button>Details</button>
        </section>
      </div>
      <section className="space-y-5">
        <header className="flex justify-between gap-3">
          <h2 className="text-2xl font-bold">Your listed vans</h2>
          <button>View all</button>
        </header>
        <div className="space-y-3">
          {hostedVans?.map((van) => (
            <div className="flex space-x-4 rounded bg-white px-6 py-4">
              <img src={van.imageUrl} alt="" className="w-16 rounded-lg" />
              <div className="flex-1">
                <h3>{van.name}</h3>
                <p>${van.price}/day</p>
              </div>
              <button>Edit</button>
            </div>
          ))}
        </div>
      </section>
    </>
  ) : (
    <NoVans />
  );
}
