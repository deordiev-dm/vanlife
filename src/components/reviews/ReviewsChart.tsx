import { ReviewType } from "../../utils/api";
import { FaStar } from "react-icons/fa6";

type Props = {
  reviews: ReviewType[] | null;
};

export default function ReviewsChart({ reviews }: Props) {
  if (!reviews) {
    return <p>You don't have any reviews for that time period</p>;
  }

  const overallRating = reviews?.length
    ? reviews.reduce((acc, curr) => {
        return acc + curr.rate;
      }, 0) / reviews?.length
    : 0;

  return (
    <>
      <div className="flex items-center space-x-1">
        <span className="text-3xl font-bold">{overallRating.toFixed(1)}</span>
        <FaStar className="h-6 w-6 fill-orange-500" />
        <p>overall rating</p>
      </div>
      <div className="space-y-3">
        <ChartLine stars={5} reviews={reviews} />
        <ChartLine stars={4} reviews={reviews} />
        <ChartLine stars={3} reviews={reviews} />
        <ChartLine stars={2} reviews={reviews} />
        <ChartLine stars={1} reviews={reviews} />
      </div>
    </>
  );
}

function ChartLine({
  stars,
  reviews,
}: {
  stars: number;
  reviews: ReviewType[];
}) {
  const filteredReviews = reviews.filter((review) => review.rate === stars);

  const percent = (filteredReviews.length / reviews.length) * 100;
  return (
    <div className="flex items-center gap-x-3">
      <span className="min-w-14">{stars} stars</span>
      <div id="rating-5" className="relative h-2 w-80 rounded-full bg-gray-300">
        <span
          className={`t-0 l-0 absolute h-full rounded-full bg-orange-400`}
          style={{
            width: `${percent}%`,
            transitionProperty: "width",
            transitionTimingFunction: "ease",
            transitionDuration: "300ms",
          }}
        ></span>
      </div>
      <span>{percent.toFixed(1)}%</span>
    </div>
  );
}
