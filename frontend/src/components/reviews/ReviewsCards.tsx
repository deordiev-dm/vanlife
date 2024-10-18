import { Review } from "../../utils/api";
import { FaStar } from "react-icons/fa6";

type Props = {
  reviews: Review[] | null;
};

export default function ReviewsCards({ reviews }: Props) {
  if (!reviews) return;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Reviews ({reviews.length})</h2>
      <div className="space-y-3">
        {reviews.map((review) => {
          return (
            <article key={review.id} className="space-y-2 border-b pb-2">
              <div className="flex gap-x-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < review.rate ? "fill-orange-400" : "fill-gray-400"
                    }
                  />
                ))}
              </div>
              <div className="flex gap-x-2">
                <div className="font-semibold">{review.reviewerName}</div>
                <div className="text-gray-600">
                  {new Date(review.timestamp).toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <p>{review.reviewBody}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
