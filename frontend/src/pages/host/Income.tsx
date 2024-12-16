import getHostTransactions from "@/features/transactions/api/getHostTransactions";
import { isWithinNMonths } from "@/lib/utils/isWithinNMonths";
import IncomeChart from "@/features/transactions/components/IncomeChart";
import UserTransactions from "@/features/transactions/components/UserTransactions";
import IncomeHeader from "@/features/transactions/components/IncomeHeader";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_NUMBER_OF_MONTHS } from "./Dashboard";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Income() {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const monthsFilter =
    Number(searchParams.get("months")) || DEFAULT_NUMBER_OF_MONTHS;

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      months: monthsFilter,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: transactions,
    isPending,
    error,
  } = useQuery({
    queryKey: ["transactions", "host", currentUser],
    queryFn: () => getHostTransactions(currentUser?._id || ""),
    staleTime: Infinity,
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const transactionsWithinMonths = transactions.filter((transaction) =>
    isWithinNMonths(new Date(transaction.createdAt).getTime(), monthsFilter),
  );

  const income = transactionsWithinMonths.reduce(
    (acc, curr) => acc + curr.sum,
    0,
  );

  return (
    <div className="space-y-8">
      <IncomeHeader
        monthsFilter={monthsFilter}
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
