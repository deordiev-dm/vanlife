import StarIcon from "@/components/icons/StarIcon";
import { Review } from "@/lib/types/types";

type Props = {
  reviews: Review[] | null;
};

export default function ReviewsCards({ reviews }: Props) {
  if (!reviews) return;

  return (
    <div className="grid gap-6">
      {reviews.map((review) => {
        return (
          <article
            key={review._id}
            className="rounded-lg bg-orange-100 p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <img
                src={review.van.imageUrl}
                alt={`Image of ${review.van.name}`}
                className="h-32 w-full rounded-lg object-cover sm:w-40"
              />
              <div className="flex-1">
                <header className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-orange-600">
                      {review.rate}
                    </span>
                    <StarIcon className="h-5 w-5 fill-orange-500" />
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </header>
                <h3 className="mt-3 text-lg font-semibold text-gray-800">
                  {review.van.name}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-700">
                  {review.reviewBody}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
