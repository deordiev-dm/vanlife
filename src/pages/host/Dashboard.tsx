import { useEffect, useState } from "react";
import { useVans } from "../../hooks/useVans";
import { useAuth } from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa6";
import NoVans from "../../components/NoVans";
import { Link } from "react-router-dom";
import { getUserTransactions, TransactionType } from "../../utils/api";
import { nanoid } from "nanoid";
import DropdownMenu from "../../components/utils/dropdown/DropdownMenu";
import { isWithinNMonths } from "../../utils/isWithinNMonths";
import DropdownElement from "../../components/utils/dropdown/DropdownElement";
import ErrorMessage from "../../components/utils/ErrorMessage";

export default function Dashboard() {
  const { vans, fetchVans } = useVans();
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const MONTHS_MAP = {
    1: "month",
    3: "3 months",
    6: "6 months",
    12: "year",
  };

  useEffect(() => {
    if (!currentUser) return;
    if (!vans.length) {
      fetchVans({ prop: "hostId", equalTo: currentUser?.uid })
        .catch((err) => setError(err))
        .finally();
    }
    getUserTransactions(currentUser.uid)
      .then((data) => setTransactions(data))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  const hostedVans = currentUser
    ? vans.filter((van) => van.hostId === currentUser.uid)
    : null;

  const income = transactions
    ? transactions
        .filter((transaction) => isWithinNMonths(transaction.timestamp, months))
        .reduce((acc, curr) => acc + curr.amount, 0)
    : 0;

  return hostedVans?.length ? (
    <>
      <div>
        <section className="-ml-6 -mr-6 space-y-5 bg-[#FFEAD0] p-6">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-x-1 text-[#4d4d4d]">
              <DropdownMenu title={`Income in the last ${MONTHS_MAP[months]}`}>
                <DropdownElement onClick={() => setMonths(1)}>
                  month
                </DropdownElement>
                <DropdownElement onClick={() => setMonths(3)}>
                  3 months
                </DropdownElement>
                <DropdownElement onClick={() => setMonths(6)}>
                  6 months
                </DropdownElement>
                <DropdownElement onClick={() => setMonths(12)}>
                  year
                </DropdownElement>
              </DropdownMenu>
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
