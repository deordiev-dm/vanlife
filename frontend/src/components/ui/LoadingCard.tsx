const LoadingCard = () => {
  return (
    <div className="animate-pulse rounded-lg bg-orange-50 p-4 shadow-lg">
      <div className="mb-4 h-80 rounded-t-lg bg-orange-100"></div>
      <div className="mb-2 h-4 w-3/4 rounded bg-orange-100"></div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-orange-100"></div>
        <div className="h-4 w-5/6 rounded bg-orange-100"></div>
        <div className="h-4 w-2/3 rounded bg-orange-100"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
