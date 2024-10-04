import { useEffect, useState } from "react";
import { getUserTransactions, type Transaction } from "../../utils/api";
import { isWithinNMonths } from "../../utils/isWithinNMonths";
import IncomeChart from "../../components/income/IncomeChart";
import UserTransactions from "../../components/income/UserTransactions";
import IncomeHeader from "../../components/income/IncomeHeader";
import ErrorMessage from "../../components/utils/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3); // todo: move state to the address bar
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUser) {
          console.error("User is not logged in");
          throw new Error("User is not logged in");
        }

        const transactionsData = await getUserTransactions(currentUser.uid);
        setTransactions(transactionsData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

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
