import { Link } from "react-router-dom";
import { Review } from "@/lib/types/types";
import { isWithinNMonths } from "@/lib/utils/isWithinNMonths";
import StarIcon from "@/components/icons/StarIcon";

type ReviewScoreSectionProps = {
  reviews: Review[];
  monthsFilter: number;
};

export default function ReviewScoreSection({
  reviews,
  monthsFilter,
}: ReviewScoreSectionProps) {
  const filteredReviews = reviews.length
    ? reviews.filter((review) =>
        isWithinNMonths(new Date(review.createdAt).getTime(), monthsFilter),
      )
    : null;

  const averageScore = filteredReviews?.length
    ? filteredReviews.reduce((acc, curr) => acc + curr.rate, 0) /
      filteredReviews.length
    : 0;

  return (
    <div className="-mx-6 flex flex-wrap items-center justify-between gap-x-6 rounded-b-lg bg-orange-100 px-6 py-4 sm:mx-0 sm:justify-normal">
      <h2 className="text-2xl font-bold transition-colors hover:text-orange-400">
        <Link to="reviews" state={monthsFilter}>
          Review score:
        </Link>
      </h2>
      <Link
        to="reviews"
        state={monthsFilter}
        className="flex items-center text-lg font-bold transition-colors hover:text-orange-400"
      >
        <StarIcon className="mr-1 size-6 fill-orange-500" />
        <span>{averageScore?.toFixed(1)}</span>
        <span className="font-normal">/5</span>
      </Link>
    </div>
  );
}
