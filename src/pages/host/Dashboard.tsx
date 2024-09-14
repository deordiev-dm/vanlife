import { useEffect, useState } from "react";
import { useVans } from "../../hooks/useVans";
import { useAuth } from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa6";
import NoVans from "../../components/NoVans";
import { Link } from "react-router-dom";
import { getUserTransactions, TransactionType } from "../../utils/api";
import { nanoid } from "nanoid";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DashboardDropdown from "../../components/DashboardDropdown";

export default function Dashboard() {
  const { vans, fetchVans } = useVans();
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const [numberOfDays, setNumberOfDays] = useState(30);

  useEffect(() => {
    if (!currentUser) return;
    if (!vans.length) {
      fetchVans({ prop: "hostId", equalTo: currentUser?.uid })
        .catch((err) => console.error(err))
        .finally();
    }
    getUserTransactions(currentUser.uid).then((data) => setTransactions(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hostedVans = currentUser
    ? vans.filter((van) => van.hostId === currentUser.uid)
    : null;

  const income = transactions
    ? transactions
        .filter((transaction) =>
          isWithinLastNDays(transaction.timestamp, numberOfDays),
        )
        .reduce((acc, curr) => acc + curr.amount, 0)
    : 0;

  return hostedVans?.length ? (
    <>
      <div>
        <section className="-ml-6 -mr-6 space-y-5 bg-[#FFEAD0] p-6">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-x-1 text-[#4d4d4d]">
              <p>Income in the</p>
              <div className="group relative flex items-center gap-x-1">
                <button className="font-semibold underline">
                  last {numberOfDays} days
                </button>
                <DashboardDropdown setNumberOfDays={setNumberOfDays} />
                <MdOutlineKeyboardArrowDown className="rotate-180 transition-transform group-hover:rotate-0" />
              </div>
            </div>
            <Link to="income" className="hover:underline">
              Details
            </Link>
          </div>

          <p className="text-4xl font-extrabold">${income}</p>
        </section>
        <section className="-ml-6 -mr-6 flex items-center gap-4 bg-[#FFDDB2] p-6">
          <h2 className="flex text-2xl font-bold">Review score</h2>
          <span className="flex flex-1 items-center pl-2 text-lg font-bold">
            <FaStar className="mr-1 fill-orange-500" />
            <span>5.0</span>
            <span className="font-normal text-[#4d4d4d]">/5</span>
          </span>

          <Link to="reviews" className="hover:underline">
            Details
          </Link>
        </section>
      </div>
      <section className="space-y-5">
        <header className="flex justify-between gap-3">
          <h2 className="text-2xl font-bold">Your listed vans</h2>
          <Link to="vans" className="hover:underline">
            View all
          </Link>
        </header>
        <div className="space-y-3">
          {hostedVans?.map((van) => (
            <div
              key={nanoid()}
              className="flex items-center space-x-4 rounded bg-white px-6 py-4"
            >
              <img src={van.imageUrl} alt="" className="w-16 rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{van.name}</h3>
                <p>${van.price}/day</p>
              </div>
              <Link to={`vans/${van.id}`} className="hover:underline">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  ) : (
    <NoVans />
  );
}

function isWithinLastNDays(timestamp: number, days: number): boolean {
  const now = Date.now();
  const nDaysAgo = now - days * 24 * 60 * 60 * 1000;

  return timestamp >= nDaysAgo && timestamp <= now;
}
