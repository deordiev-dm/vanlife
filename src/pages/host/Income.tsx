import { useEffect, useState } from "react";
import DashboardDropdown from "../../components/DashboardDropdown";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getUserTransactions, TransactionType } from "../../utils/api";
import { isWithinLastNDays } from "../../utils/isWithinLastNDays";
import { useAuth } from "../../hooks/useAuth";
import IncomeChart from "../../components/IncomeChart";

export default function Dashboard() {
  const [numberOfDays, setNumberOfDays] = useState(30);
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    getUserTransactions(currentUser.uid).then((data) => setTransactions(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const income = transactions
    ? transactions
        .filter((transaction) =>
          isWithinLastNDays(transaction.timestamp, numberOfDays),
        )
        .reduce((acc, curr) => acc + curr.amount, 0)
    : 0;

  return (
    <>
      <div className="flex items-center gap-x-3">
        <h1 className="text-3xl font-bold">Income</h1>
        <div className="group relative flex items-center gap-x-1">
          <button className="font-semibold underline">
            last {numberOfDays} days
          </button>
          <DashboardDropdown setNumberOfDays={setNumberOfDays} />
          <MdOutlineKeyboardArrowDown className="rotate-180 transition-transform group-hover:rotate-0" />
        </div>
      </div>
      <p className="text-4xl font-extrabold">${income}</p>
      <IncomeChart transactions={transactions} />
    </>
  );
}
