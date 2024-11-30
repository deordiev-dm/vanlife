import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import DropdownElement from "@/components/ui/dropdown/DropdownElement";
import DropdownMenu from "@/components/ui/dropdown/DropdownMenu";
import generateNewSearchParams from "@/lib/utils/generateNewSearchParams";

type IncomeHeaderProps = {
  income: number;
  monthsFilter: number;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

function IncomeHeader({
  searchParams,
  setSearchParams,
  monthsFilter,
  income,
}: IncomeHeaderProps) {
  const animatedIncome = useCounterAnimation(income);

  return (
    <div className="flex flex-col items-start space-y-3">
      <h1 className="text-3xl font-bold">Income: ${animatedIncome}</h1>
      <DropdownMenu title={`in the last ${monthsFilter} months`}>
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
    </div>
  );
}

export default IncomeHeader;
