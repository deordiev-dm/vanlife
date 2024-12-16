import { nanoid } from "nanoid";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page"));

  if (!currentPage || currentPage < 0) {
    currentPage = 1;
  }

  const buttonLabels = getLabels(Number(currentPage), totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center space-x-2 text-orange-600"
    >
      <button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set("page", `${Number(currentPage) - 1}`);
            return prev;
          })
        }
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${currentPage === 1 && "pointer-events-none border-gray-400 bg-gray-100 text-gray-400 opacity-50"} hidden h-8 w-8 items-center justify-center rounded border border-orange-500 px-2 hover:bg-orange-100 sm:flex md:h-12 md:w-12`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="flex gap-x-2">
        {buttonLabels.map((label) => {
          if (label.type === "page") {
            const isActive = label.value === Number(currentPage);
            return (
              <button
                key={nanoid()}
                className={`aspect-square h-8 w-8 rounded border border-orange-500 transition-colors md:h-12 md:w-12 ${isActive ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-200"}`}
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("page", `${Number(label.value)}`);
                    return prev;
                  })
                }
              >
                {label.value}
              </button>
            );
          } else if (label.type === "ellipsis") {
            return (
              <button
                key={nanoid()}
                className="aspect-square h-8 w-8 rounded border border-orange-500 transition-colors hover:bg-orange-200 md:h-12 md:w-12"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("page", `${Number(label.page)}`);
                    return prev;
                  })
                }
              >
                {label.value}
              </button>
            );
          }
        })}
      </div>
      <button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set("page", `${Number(currentPage) + 1}`);
            return prev;
          })
        }
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${currentPage === totalPages && "pointer-events-none border-gray-400 bg-gray-100 text-gray-400 opacity-50"} hidden h-8 w-8 items-center justify-center rounded border border-orange-500 px-2 hover:bg-orange-100 sm:flex md:h-12 md:w-12`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </nav>
  );
}

type labelType =
  | { type: "page"; value: number }
  | {
      type: "ellipsis";
      value: "...";
      page: number;
    };

function getLabels(currentPage: number, totalPages: number): labelType[] {
  const labels: labelType[] = [];
  // when there is not a lof pages
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      labels.push({ type: "page", value: i });
    }
  } else {
    // current page is near the start
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        labels.push({ type: "page", value: i });
      }
      labels.push(
        { type: "ellipsis", value: "...", page: 6 },
        { type: "page", value: totalPages },
      );
    }
    // current page is near the end
    else if (currentPage >= totalPages - 3) {
      labels.push(
        { type: "page", value: 1 },
        { type: "ellipsis", value: "...", page: totalPages - 5 },
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        labels.push({ type: "page", value: i });
      }
    }
    // current page in the middle
    else {
      labels.push(
        { type: "page", value: 1 },
        { type: "ellipsis", value: "...", page: currentPage - 2 },
        { type: "page", value: currentPage - 1 },
        { type: "page", value: currentPage },
        { type: "page", value: currentPage + 1 },
        { type: "ellipsis", value: "...", page: currentPage + 2 },
        { type: "page", value: totalPages },
      );
    }
  }

  return labels;
}
