import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import getHostReviews from "@/features/reviews/api/getHostReviews";
import ErrorMessage from "../../components/ui/ErrorPopup";
import ReviewsHeader from "@/features/reviews/components/ReviewsHeader";
import ReviewsChart from "@/features/reviews/components/ReviewsChart";
import { isWithinNMonths } from "../../lib/utils/isWithinNMonths";
import ReviewsCards from "@/features/reviews/components/ReviewsCards";
import ErrorPopup from "../../components/ui/ErrorPopup";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_NUMBER_OF_MONTHS } from "./Dashboard";

export default function Reviews() {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const monthsFilter =
    Number(searchParams.get("months")) || DEFAULT_NUMBER_OF_MONTHS;

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      months: monthsFilter,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (reviews === undefined) {
    return;
  }

  const filteredReviews = reviews
    .filter((review) =>
      isWithinNMonths(new Date(review.createdAt).getTime(), monthsFilter),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <div className="space-y-8">
      {error && <ErrorPopup error={error} key={Date.now()} />}
      <ReviewsHeader
        monthsFilter={monthsFilter}
        setSearchParams={setSearchParams}
      />
      {filteredReviews.length ? (
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
