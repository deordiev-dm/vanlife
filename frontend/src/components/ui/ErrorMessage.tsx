function ErrorMessage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-red-100 p-6 text-red-800 shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 9v4m0 4h.01"
        />
      </svg>
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-center text-sm text-gray-700">
        We couldn't load the required resource. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Reload Page
      </button>
    </div>
  );
}

export default ErrorMessage;
