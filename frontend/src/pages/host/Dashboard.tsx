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

  const location = useLocation();
  const monthsFromLocation = location.state?.monthsFilter as number | undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  if (monthsFromLocation) {
    setSearchParams({ months: monthsFromLocation.toString() });
  }

  const monthsFilter =
    Number(searchParams.get("months")) || monthsFromLocation || 3;

  const {
    data: vans,
    isPending: isVansPending,
    error: vansError,
  } = useQuery({
    queryKey: ["hostVans", currentUser],
    queryFn: () => getHostVans(currentUser?._id || ""),
    staleTime: Infinity,
  });

  const {
    data: transactions,
    isPending: isTransactionsPending,
    error: transactionsError,
  } = useQuery({
    queryKey: ["hostTransactions", currentUser],
    queryFn: () => getHostTransactions(currentUser?._id || ""),
    staleTime: Infinity,
  });

  const {
    data: reviews,
    isPending: isReviewsPending,
    error: reviewsError,
  } = useQuery({
    queryKey: ["hostReviews", currentUser],
    queryFn: () => getHostReviews(currentUser?._id || ""),
    staleTime: Infinity,
  });

  if (isVansPending || isTransactionsPending || isReviewsPending) {
    return <span className="loader"></span>;
  }

  if (
    vans === undefined ||
    reviews === undefined ||
    transactions === undefined
  ) {
    return;
  }

  return (
    <>
      {(vansError || transactionsError || reviewsError) && (
        <ErrorPopup
          key={Date.now()}
          error={new Error("Failed to load resources. Please try again later.")}
        />
      )}
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
      {vans.length === 0 && <BecomeAHost path="vans/add-van" />}
    </>
  );
}
