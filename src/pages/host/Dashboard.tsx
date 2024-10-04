import { useEffect, useState } from "react";
import { useVans } from "../../hooks/useVans";
import { useAuth } from "../../hooks/useAuth";
import {
  getUserReviews,
  getUserTransactions,
  type Review,
  type Transaction,
} from "../../utils/api";
import ErrorMessage from "../../components/utils/ErrorMessage";
import IncomeSection from "../../components/dashboard/IncomeSection";
import ReviewScoreSection from "../../components/dashboard/ReviewScoreSection";
import VansListSection from "../../components/dashboard/VansListSection";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const { vans, fetchVans } = useVans();
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const location = useLocation();
  const monthsFromLocation = location.state?.monthsFilter as number | undefined;

  const [searchParams, setSearchParams] = useSearchParams();
  const monthsFilter = monthsFromLocation || 3;

  useEffect(() => {
    if (!currentUser) {
      console.error("User is not logged in");
      throw new Error("User is not logged in");
    }

    const fetchData = async () => {
      try {
        if (!vans.length) {
          await fetchVans({ prop: "hostId", equalTo: currentUser.uid });
        }
        const [transactionsData, reviewsData] = await Promise.all([
          getUserTransactions(currentUser.uid),
          getUserReviews(currentUser.uid),
        ]);

        setTransactions(transactionsData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser, fetchVans, vans.length]);

  if (error || !currentUser) {
    return <ErrorMessage />;
  }

  if (isLoading && !vans.length) {
    return (
      <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div>
        <IncomeSection
          monthsFilter={monthsFilter}
          transactions={transactions}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <ReviewScoreSection reviews={reviews} monthsFilter={monthsFilter} />
      </div>
      <VansListSection vans={vans} userId={currentUser.uid} />
    </>
  );
}
