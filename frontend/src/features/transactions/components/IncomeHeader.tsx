import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import DropdownElement from "@/components/ui/dropdown/DropdownElement";
import DropdownMenu from "@/components/ui/dropdown/DropdownMenu";
import { DROPDOWN_OPTIONS } from "@/lib/data";
import { SetURLSearchParams } from "react-router-dom";

type IncomeHeaderProps = {
  income: number;
  monthsFilter: number;
  setSearchParams: SetURLSearchParams;
};

function IncomeHeader({
  setSearchParams,
  monthsFilter,
  income,
}: IncomeHeaderProps) {
  const animatedIncome = useCounterAnimation(income);

  return (
    <div className="flex flex-col items-start space-y-3">
      <h1 className="text-3xl font-bold">Income: ${animatedIncome}</h1>
      <DropdownMenu title={`in the last ${monthsFilter} months`}>
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
    </div>
  );
}

export default IncomeHeader;
