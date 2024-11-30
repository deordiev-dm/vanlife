import { Review } from "@/lib/types/types";

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
            <article key={review._id} className="space-y-2 border-b pb-2">
              <div className="flex gap-x-1"></div>
              <div className="flex gap-x-2">
                <div className="font-semibold">{review.reviewerId}</div>
                <div className="text-gray-600">
                  {new Date(review.createdAt).toLocaleString("default", {
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
