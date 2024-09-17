import { useEffect, useState } from "react";
import { getUserTransactions, TransactionType } from "../../utils/api";
import { isWithinNMonths } from "../../utils/isWithinNMonths";
import { useAuth } from "../../hooks/useAuth";
import IncomeChart from "../../components/income/IncomeChart";
import UserTransactions from "../../components/income/UserTransactions";
import IncomeHeader from "../../components/income/IncomeHeader";
import ErrorMessage from "../../components/utils/ErrorMessage";

export default function Dashboard() {
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3);
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!currentUser) return;
    getUserTransactions(currentUser.uid)
      .then((data) => setTransactions(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
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

  const transactionsWithinMonths = transactions
    ? transactions?.filter((transaction) =>
        isWithinNMonths(transaction.timestamp, months),
      )
    : [];

  const income = transactionsWithinMonths.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  return (
    <>
      <IncomeHeader income={income} months={months} setMonths={setMonths} />
      <IncomeChart transactions={transactionsWithinMonths} months={months} />
      <UserTransactions transactions={transactionsWithinMonths} />
    </>
  );
}
