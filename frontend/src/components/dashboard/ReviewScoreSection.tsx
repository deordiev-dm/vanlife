import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { type Review } from "../../utils/api";
import { isWithinNMonths } from "../../utils/isWithinNMonths";

type ReviewScoreSectionProps = {
  reviews: Review[] | null;
  monthsFilter: number;
};

export default function ReviewScoreSection({
  reviews,
  monthsFilter,
}: ReviewScoreSectionProps) {
  const filteredReviews = reviews
    ? reviews.filter((review) =>
        isWithinNMonths(new Date(review.createdAt).getTime(), monthsFilter),
      )
    : null;

  const averageScore = filteredReviews?.length
    ? filteredReviews.reduce((acc, curr) => acc + curr.rate, 0) /
      filteredReviews.length
    : null;

  return (
    <section className="-ml-6 -mr-6 flex items-center gap-4 bg-[#FFDDB2] p-6">
      <h2 className="flex text-2xl font-bold">Review score</h2>
      <span className="flex flex-1 items-center pl-2 text-lg font-bold">
        <FaStar className="mr-1 fill-orange-500" />
        <span className="min-w-7">{averageScore?.toFixed(1)}</span>
        <span className="font-normal text-[#4d4d4d]">/5</span>
      </span>

      <Link to="reviews" className="hover:underline" state={{ monthsFilter }}>
        Details
      </Link>
    </section>
  );
}
