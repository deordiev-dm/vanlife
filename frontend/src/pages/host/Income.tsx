import getHostTransactions from "@/features/transactions/api/getHostTransactions";
import { isWithinNMonths } from "@/lib/utils/isWithinNMonths";
import IncomeChart from "@/features/transactions/components/IncomeChart";
import UserTransactions from "@/features/transactions/components/UserTransactions";
import IncomeHeader from "@/features/transactions/components/IncomeHeader";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_NUMBER_OF_MONTHS } from "./Dashboard";
import { useEffect } from "react";

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
    queryKey: ["hostTransactions", currentUser],
    queryFn: () => getHostTransactions(currentUser?._id || ""),
    staleTime: Infinity,
  });

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

  if (isPending) {
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
