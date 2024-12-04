import StarIcon from "@/components/icons/StarIcon";
import { Review } from "@/lib/types/types";

type Props = {
  reviews: Review[] | null;
};

export default function ReviewsChart({ reviews }: Props) {
  if (!reviews) return null;

  const overallRating = reviews.length
    ? reviews.reduce((acc, curr) => acc + curr.rate, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl font-extrabold text-orange-600">
            {overallRating.toFixed(1)}
          </span>
          <StarIcon className="h-6 w-6 fill-orange-500" />
        </div>
        <span className="text-lg font-medium text-gray-600">
          Average Rating
        </span>
      </div>
      <div className="space-y-4">
        {[5, 4, 3, 2, 1].map((star) => (
          <ChartLine key={star} stars={star} reviews={reviews} />
        ))}
      </div>
    </div>
  );
}

function ChartLine({ stars, reviews }: { stars: number; reviews: Review[] }) {
  const filteredReviews = reviews.filter((review) => review.rate === stars);
  const percent = (filteredReviews.length / reviews.length) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="w-16 text-gray-700">{stars} stars</span>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute h-full rounded-full bg-orange-500 transition-all duration-500 ease-in-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="w-10 text-gray-600">{filteredReviews.length}</span>
    </div>
  );
}
