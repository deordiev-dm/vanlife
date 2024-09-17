import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getReviews, ReviewType } from "../../utils/api";
import ErrorMessage from "../../components/utils/ErrorMessage";
import ReviewsHeader from "../../components/reviews/ReviewsHeader";
import ReviewsChart from "../../components/reviews/ReviewsChart";
import { isWithinNMonths } from "../../utils/isWithinNMonths";

export default function Reviews() {
  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3);

  useEffect(() => {
    if (!currentUser) return;

    getReviews(currentUser.uid)
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  const filteredReviews = reviews
    ? reviews.filter((review) => isWithinNMonths(review.timestamp, months))
    : null;

  return (
    <>
      <ReviewsHeader months={months} setMonths={setMonths} />
      <ReviewsChart reviews={filteredReviews} />
    </>
  );
}
