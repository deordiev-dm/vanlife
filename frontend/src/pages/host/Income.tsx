import { useEffect, useState } from "react";
import { type Transaction } from "../../lib/types/types";
import { getUserTransactions } from "@/features/transactions/database/transactions";
import { isWithinNMonths } from "../../lib/utils/isWithinNMonths";
import IncomeChart from "../../components/income/IncomeChart";
import UserTransactions from "../../components/income/UserTransactions";
import IncomeHeader from "../../components/income/IncomeHeader";
import ErrorMessage from "../../components/utils/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const monthsFromLocation = location.state?.monthsFilter as number | undefined;

  useEffect(() => {
    if (monthsFromLocation) {
      setSearchParams({ months: monthsFromLocation.toString() });
    }
  }, [monthsFromLocation, setSearchParams]);

  const monthsFilter =
    Number(searchParams.get("months")) || monthsFromLocation || 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser) {
          console.error("User is not logged in");
          throw new Error("User is not logged in");
        }

        const transactionsData = await getUserTransactions(currentUser._id);
        setTransactions(transactionsData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const transactionsWithinMonths = transactions
    ? transactions?.filter((transaction) =>
        isWithinNMonths(
          new Date(transaction.createdAt).getTime(),
          monthsFilter,
        ),
      )
    : [];

  const income = transactionsWithinMonths.reduce(
    (acc, curr) => acc + curr.sum,
    0,
  );

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

  return (
    <>
      <IncomeHeader
        monthsFilter={monthsFilter}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        income={income}
      />
      <IncomeChart
        transactions={transactionsWithinMonths}
        monthsFilter={monthsFilter}
      />
      <UserTransactions transactions={transactionsWithinMonths} />
    </>
  );
}
