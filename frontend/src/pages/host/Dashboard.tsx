import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

import { getUserReviews } from "@/features/reviews/database/reviews";
import { getUserTransactions } from "@/features/transactions/database/transactions";
import { type Review, type Transaction } from "@/lib/types/types";

import { getHostVans } from "@/features/vans/database/vans";

import ErrorMessage from "@/components/ui/ErrorPopup";
import IncomeSection from "@/components/dashboard/IncomeSection";
import ReviewScoreSection from "@/components/dashboard/ReviewScoreSection";
import VansListSection from "@/components/dashboard/VansListSection";
import { useLocation, useSearchParams } from "react-router-dom";
import { Van } from "@/lib/types/types";

export default function Dashboard() {
  const [vans, setVans] = useState<Van[] | null>(null);
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const location = useLocation();
  const monthsFromLocation = location.state?.monthsFilter as number | undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (monthsFromLocation) {
      setSearchParams({ months: monthsFromLocation.toString() });
    }
  }, [monthsFromLocation, setSearchParams]);

  const monthsFilter =
    Number(searchParams.get("months")) || monthsFromLocation || 3;

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setError("User is not authenticated");
        return;
      }

      try {
        setIsLoading(true);

        if (!vans) {
          const hostVans = await getHostVans(currentUser._id);
          setVans(hostVans);
        }

        const [transactionsData, reviewsData] = await Promise.all([
          getUserTransactions(currentUser._id),
          getUserReviews(currentUser._id),
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error || !currentUser) {
    return <ErrorMessage />;
  }

  if (isLoading || !vans) {
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
      <VansListSection vans={vans} userId={currentUser._id} />
    </>
  );
}
