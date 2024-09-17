import DropdownElement from "../utils/dropdown/DropdownElement";
import DropdownMenu from "../utils/dropdown/DropdownMenu";

const MONTHS_MAP = {
  1: "month",
  3: "3 months",
  6: "6 months",
  12: "year",
};

type Props = {
  months: 1 | 3 | 6 | 12;
  setMonths: React.Dispatch<React.SetStateAction<1 | 3 | 6 | 12>>;
};

function ReviewsHeader({ months, setMonths }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <h1 className="text-3xl font-bold">Your reviews</h1>
      <DropdownMenu title={`last ${MONTHS_MAP[months]}`}>
        <DropdownElement onClick={() => setMonths(1)}>month</DropdownElement>
        <DropdownElement onClick={() => setMonths(3)}>3 months</DropdownElement>
        <DropdownElement onClick={() => setMonths(6)}>6 months</DropdownElement>
        <DropdownElement onClick={() => setMonths(12)}>year</DropdownElement>
      </DropdownMenu>
    </div>
  );
}

export default ReviewsHeader;
