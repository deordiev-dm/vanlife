import { useCounterAnimation } from "../../hooks/useCounterAnimation";
import DropdownElement from "../utils/dropdown/DropdownElement";
import DropdownMenu from "../utils/dropdown/DropdownMenu";

const MONTHS_MAP = {
  1: "month",
  3: "3 months",
  6: "6 months",
  12: "year",
};

type Props = {
  income: number;
  months: 1 | 3 | 6 | 12;
  setMonths: React.Dispatch<React.SetStateAction<1 | 3 | 6 | 12>>;
};

function IncomeHeader({ setMonths, months, income }: Props) {
  const animatedIncome = useCounterAnimation(income);

  return (
    <div className="flex items-center justify-around gap-x-8">
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
      <p className="text-5xl font-bold">${animatedIncome}</p>
    </div>
  );
}

export default IncomeHeader;
