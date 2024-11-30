import { Link, SetURLSearchParams } from "react-router-dom";
import DropdownElement from "@/components/ui/dropdown/DropdownElement";
import DropdownMenu from "@/components/ui/dropdown/DropdownMenu";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { Transaction } from "@/lib/types/types";
import { isWithinNMonths } from "@/lib/utils/isWithinNMonths";
import { DROPDOWN_OPTIONS } from "@/lib/data";

type IncomeSectionProps = {
  monthsFilter: number;
  setSearchParams: SetURLSearchParams;
  transactions: Transaction[] | null;
};

export default function IncomeSection({
  monthsFilter,
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
    <div className="-mx-6 flex flex-col items-start gap-y-4 rounded-t-lg bg-orange-200 px-6 py-4 sm:mx-0">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <DropdownMenu title={`last ${monthsFilter} months`}>
        {DROPDOWN_OPTIONS.map((option, index) => (
          <DropdownElement
            key={index}
            onClick={() =>
              setSearchParams((prevParams) => ({
                ...prevParams,
                months: option.months,
              }))
            }
          >
            {option.label}
          </DropdownElement>
        ))}
      </DropdownMenu>
      <Link
        to="income"
        state={{ monthsFilter }}
        className="flex gap-x-2 text-2xl font-bold transition-colors hover:text-orange-500"
      >
        <h2>Income:</h2>
        <span>${animatedIncome}</span>
      </Link>
    </div>
  );
}
