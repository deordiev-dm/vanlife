import { useEffect, useState } from "react";
import { type Transaction } from "@/lib/types/types";
import { getUserTransactions } from "@/features/transactions/api/getHostTransactions";
import { isWithinNMonths } from "@/lib/utils/isWithinNMonths";
import IncomeChart from "@/features/transactions/components/IncomeChart";
import UserTransactions from "@/features/transactions/components/UserTransactions";
import IncomeHeader from "@/features/transactions/components/IncomeHeader";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useSearchParams } from "react-router-dom";
import ErrorPopup from "@/components/ui/ErrorPopup";

const DEFAULT_NUMBER_OF_MONTHS = 3;

export default function Income() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const monthsFromLocation = location.state?.monthsFilter as number | undefined;

  useEffect(() => {
    if (monthsFromLocation === undefined) return;

    if (monthsFromLocation > 1 && monthsFromLocation <= 12) {
      setSearchParams({ months: monthsFromLocation.toString() });
      return;
    }

    setSearchParams({ months: `${DEFAULT_NUMBER_OF_MONTHS}` });
    setError(new Error("Invalid month range."));
  }, [monthsFromLocation, setSearchParams]);

  const monthsFromSP = Number(searchParams.get("months"));

  const monthsFilter =
    monthsFromSP > 1 && monthsFromSP <= 12
      ? monthsFromSP
      : monthsFromLocation
        ? monthsFromLocation
        : DEFAULT_NUMBER_OF_MONTHS;

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
        if (err instanceof Error) {
          setError(err);
        }
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

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && <ErrorPopup error={error} />}
      <IncomeHeader
        monthsFilter={monthsFilter}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        income={income}
      />
      {transactionsWithinMonths.length > 0 ? (
        <>
          <IncomeChart
            transactions={transactionsWithinMonths}
            monthsFilter={monthsFilter}
          />
          <UserTransactions transactions={transactionsWithinMonths} />
        </>
      ) : (
        <div className="rounded-lg bg-orange-500 p-4 text-lg text-white">
          You don't have any income for that time period.
        </div>
      )}
    </div>
  );
}
