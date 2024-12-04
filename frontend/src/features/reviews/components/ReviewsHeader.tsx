import DropdownElement from "@/components/ui/dropdown/DropdownElement";
import DropdownMenu from "@/components/ui/dropdown/DropdownMenu";
import { DROPDOWN_OPTIONS } from "@/lib/data";
import { SetURLSearchParams } from "react-router-dom";

type ReviewsHeaderProps = {
  monthsFilter: number;
  setSearchParams: SetURLSearchParams;
};

function ReviewsHeader({ monthsFilter, setSearchParams }: ReviewsHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-extrabold text-gray-800">Your reviews</h1>
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

export default ReviewsHeader;
