import { useAuth } from "@/hooks/useAuth";
import getHostReviews from "@/features/reviews/api/getHostReviews";
import getHostTransactions from "@/features/transactions/api/getHostTransactions";
import getHostVans from "@/features/vans/api/getHostVans";
import IncomeSection from "@/features/transactions/components/DashboardIncomeSection";
import ReviewScoreSection from "@/features/reviews/components/ReviewScoreSection";
import VansListSection from "@/features/vans/components/VansListSection";
import { useSearchParams } from "react-router-dom";
import { BecomeAHost } from "@/components/ui/BecomeAHost";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";

export const DEFAULT_NUMBER_OF_MONTHS = 3;

export default function Dashboard() {
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
    data: vans,
    isPending: isVansPending,
    error: vansError,
  } = useQuery({
    queryKey: ["vans", "host", currentUser],
    queryFn: () => getHostVans(currentUser?._id || ""),
    staleTime: Infinity,
  });

  const {
    data: transactions,
    isPending: isTransactionsPending,
    error: transactionsError,
  } = useQuery({
    queryKey: ["transactions", "host", currentUser],
    queryFn: () => getHostTransactions(currentUser?._id || ""),
    staleTime: Infinity,
  });

  const {
    data: reviews,
    isPending: isReviewsPending,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", "host", currentUser],
    queryFn: () => getHostReviews(currentUser?._id || ""),
    staleTime: Infinity,
  });

  if (isVansPending || isTransactionsPending || isReviewsPending) {
    return <span className="loader"></span>;
  }

  if (vansError || transactionsError || reviewsError)
    return <ErrorMessage key={Date.now()} />;

  return (
    <>
      <div>
        <IncomeSection
          monthsFilter={monthsFilter}
          transactions={transactions}
          setSearchParams={setSearchParams}
        />
        <ReviewScoreSection reviews={reviews} monthsFilter={monthsFilter} />

        {currentUser && (
          <VansListSection vans={vans} userId={currentUser._id} />
        )}
      </div>
      {vans.length === 0 && <BecomeAHost path="vans/add-van" />}
    </>
  );
}
