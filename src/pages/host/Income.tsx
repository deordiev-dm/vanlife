import { useEffect, useState } from "react";
import DropdownMenu from "../../components/utils/dropdown/DropdownMenu";
import { getUserTransactions, TransactionType } from "../../utils/api";
import { isWithinNMonths } from "../../utils/isWithinNMonths";
import { useAuth } from "../../hooks/useAuth";
import IncomeChart from "../../components/IncomeChart";
import DropdownElement from "../../components/utils/dropdown/DropdownElement";
import UserTransactions from "../../components/UserTransactions";

export default function Dashboard() {
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3);
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const { currentUser } = useAuth();

  const MONTHS_MAP = {
    1: "month",
    3: "3 months",
    6: "6 months",
    12: "year",
  };

  useEffect(() => {
    if (!currentUser) return;
    getUserTransactions(currentUser.uid).then((data) => setTransactions(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="flex flex-col items-start">
        <h1 className="mb-3 text-4xl font-bold">Income</h1>
        <DropdownMenu title={`in the last ${MONTHS_MAP[months]}`}>
          <DropdownElement onClick={() => setMonths(1)}>month</DropdownElement>
          <DropdownElement onClick={() => setMonths(3)}>
            3 months
          </DropdownElement>
          <DropdownElement onClick={() => setMonths(6)}>
            6 months
          </DropdownElement>
          <DropdownElement onClick={() => setMonths(12)}>year</DropdownElement>
        </DropdownMenu>
      </div>
      <p className="text-4xl font-extrabold">${income}</p>
      <IncomeChart transactions={transactionsWithinMonths} months={months} />
      <UserTransactions transactions={transactionsWithinMonths} />
    </>
  );
}
