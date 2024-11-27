import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import getHostReviews from "@/features/reviews/api/getHostReviews";
import getHostTransactions from "@/features/transactions/api/getHostTransactions";
import getHostVans from "@/features/vans/api/getHostVans";
import IncomeSection from "@/features/transactions/components/DashboardIncomeSection";
import ReviewScoreSection from "@/features/reviews/components/ReviewScoreSection";
import VansListSection from "@/features/vans/components/VansListSection";
import { useLocation, useSearchParams } from "react-router-dom";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { BecomeAHost } from "@/components/ui/BecomeAHost";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  const {
    data: transactions,
    isPending: isTransactionsPending,
    isError: isTransactionError,
  } = useQuery({
    queryKey: ["hostTransactions", currentUser?._id],
    queryFn: () => getHostTransactions(currentUser?._id),
    staleTime: Infinity,
  });

  const {
    data: vans,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["hostVans", currentUser._id],
    queryFn: () => getHostVans(currentUser._id),
    staleTime: Infinity,
  });

  const {
    data: reviews,
    isPending: isReviewsPending,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ["hostReviews", currentUser._id],
    queryFn: () => getHostReviews(currentUser._id),
    staleTime: Infinity,
  });

  if (
    vans === undefined ||
    reviews === undefined ||
    transactions === undefined
  ) {
    return;
  }

  return (
    <>
      {error && <ErrorPopup key={Date.now()} error={error} />}
      {!isLoading && vans.length ? (
        <div>
          <IncomeSection
            monthsFilter={monthsFilter}
            transactions={transactions}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
          />
          <ReviewScoreSection reviews={reviews} monthsFilter={monthsFilter} />

          {currentUser && (
            <VansListSection vans={vans} userId={currentUser._id} />
          )}
        </div>
      ) : (
        <div className="loader"></div>
      )}
      {!isLoading && vans.length === 0 && <BecomeAHost path="vans/add-van" />}
    </>
  );
}
