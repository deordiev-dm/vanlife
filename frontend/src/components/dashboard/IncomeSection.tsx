import { Link } from "react-router-dom";
import generateNewSearchParams from "../../utils/generateNewSearchParams";
import DropdownElement from "../utils/dropdown/DropdownElement";
import DropdownMenu from "../utils/dropdown/DropdownMenu";
import { useCounterAnimation } from "../../hooks/useCounterAnimation";
import { type Transaction } from "../../utils/api";
import { isWithinNMonths } from "../../utils/isWithinNMonths";

type IncomeSectionProps = {
  monthsFilter: number;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  transactions: Transaction[] | null;
};

export default function IncomeSection({
  monthsFilter,
  searchParams,
  setSearchParams,
  transactions,
}: IncomeSectionProps) {
  const income = transactions
    ? transactions
        .filter((transaction) =>
          isWithinNMonths(
            new Date(transaction.createdAt).getTime(),
            monthsFilter,
          ),
        )
        .reduce((acc, curr) => acc + curr.sum, 0)
    : 0;

  const animatedIncome = useCounterAnimation(income);

  return (
    <section className="-ml-6 -mr-6 space-y-5 bg-[#FFEAD0] p-6">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <div className="flex justify-between gap-4">
        <DropdownMenu title={`Income in the last ${monthsFilter} months`}>
          <DropdownElement
            onClick={() =>
              setSearchParams(
                generateNewSearchParams(searchParams, "months", "1"),
              )
            }
          >
            month
          </DropdownElement>
          <DropdownElement
            onClick={() =>
              setSearchParams(
                generateNewSearchParams(searchParams, "months", "3"),
              )
            }
          >
            3 months
          </DropdownElement>
          <DropdownElement
            onClick={() =>
              setSearchParams(
                generateNewSearchParams(searchParams, "months", "6"),
              )
            }
          >
            6 months
          </DropdownElement>
          <DropdownElement
            onClick={() =>
              setSearchParams(
                generateNewSearchParams(searchParams, "months", "12"),
              )
            }
          >
            year
          </DropdownElement>
        </DropdownMenu>
        <Link to="income" className="hover:underline" state={{ monthsFilter }}>
          Details
        </Link>
      </div>
      <p className="text-4xl font-extrabold">${animatedIncome}</p>
    </section>
  );
}
