import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import getHostReviews from "@/features/reviews/api/getHostReviews";
import ErrorMessage from "../../components/ui/ErrorPopup";
import ReviewsHeader from "@/features/reviews/components/ReviewsHeader";
import ReviewsChart from "@/features/reviews/components/ReviewsChart";
import { isWithinNMonths } from "../../lib/utils/isWithinNMonths";
import ReviewsCards from "@/features/reviews/components/ReviewsCards";
import ErrorPopup from "../../components/ui/ErrorPopup";
import { useQuery } from "@tanstack/react-query";

export default function Reviews() {
  const { currentUser } = useAuth();
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3);

  const {
    data: reviews,
    isPending,
    error,
  } = useQuery({
    queryKey: ["hostReviews", currentUser],
    queryFn: () => getHostReviews(currentUser?._id || ""),
    staleTime: Infinity,
  });

  if (reviews === undefined) {
    return;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  const filteredReviews = reviews?.length
    ? reviews
        .filter((review) =>
          isWithinNMonths(new Date(review.createdAt).getTime(), months),
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
    : null;

  return (
    <div className="space-y-5">
      {error && <ErrorPopup error={error} key={Date.now()} />}
      <ReviewsHeader months={months} setMonths={setMonths} />
      {filteredReviews?.length ? (
        <>
          <ReviewsChart reviews={filteredReviews} />
          <ReviewsCards reviews={filteredReviews} />
        </>
      ) : (
        <div className="rounded-lg bg-orange-500 p-4 text-lg text-white">
          You don't have any reviews for that time period
        </div>
      )}
    </div>
  );
}
