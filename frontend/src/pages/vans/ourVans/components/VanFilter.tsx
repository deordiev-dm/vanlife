import { useSearchParams } from "react-router-dom";
import FilterButton from "./FilterButton";
import generateNewSearchParams from "@/lib/utils/generateNewSearchParams";
import XMarkIcon from "@/components/icons/XMarkIcon";

const FILTER_OPTIONS = ["simple", "rugged", "luxury"];

function VanFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <FilterButton
          key={option}
          typeFilter={typeFilter}
          onClick={() =>
            setSearchParams((prev) => {
              prev.set("type", option);
              prev.set("page", "1");
              return prev;
            })
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
