import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserReviews, type Review } from "../../utils/api";
import ErrorMessage from "../../components/utils/ErrorMessage";
import ReviewsHeader from "../../components/reviews/ReviewsHeader";
import ReviewsChart from "../../components/reviews/ReviewsChart";
import { isWithinNMonths } from "../../utils/isWithinNMonths";
import ReviewsCards from "../../components/reviews/ReviewsCards";

export default function Reviews() {
  const { currentUser } = useAuth();

  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [months, setMonths] = useState<1 | 3 | 6 | 12>(3);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        const data = await getUserReviews(currentUser.uid);
        setReviews(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

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
    ? reviews
        .filter((review) => isWithinNMonths(review.timestamp, months))
        .sort((a, b) => b.timestamp - a.timestamp)
    : null;

  return (
    <>
      <ReviewsHeader months={months} setMonths={setMonths} />
      <ReviewsChart reviews={filteredReviews} />
      <ReviewsCards reviews={filteredReviews} />
    </>
  );
}
