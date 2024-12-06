import { SetURLSearchParams } from "react-router-dom";
import FilterButton from "./FilterButton";
import generateNewSearchParams from "@/lib/utils/generateNewSearchParams";
import XMarkIcon from "@/components/icons/XMarkIcon";

const FILTER_OPTIONS = ["simple", "rugged", "luxury"];

type VanFilterProps = {
  typeFilter: string | null;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

function VanFilter({
  typeFilter,
  setSearchParams,
  searchParams,
}: VanFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <FilterButton
          key={option}
          typeFilter={typeFilter}
          onClick={() =>
            setSearchParams(
              generateNewSearchParams(searchParams, "type", option),
            )
          }
          filterOption={option}
        >
          {option}
        </FilterButton>
      ))}

      {typeFilter && (
        <FilterButton
          typeFilter=""
          filterOption=""
          onClick={() =>
            setSearchParams(generateNewSearchParams(searchParams, "type", null))
          }
        >
          <div className="flex items-center gap-x-1">
            <XMarkIcon className="h-5 w-5" />
            <span>Clear filters</span>
          </div>
        </FilterButton>
      )}
    </div>
  );
}

export default VanFilter;
