import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthRequired() {
  const { currentUser, authLoading } = useAuth();
  const { pathname } = useLocation();

  if (authLoading) return <div className="loader"></div>;

  if (currentUser) {
    return <Outlet />;
  }

  return (
    <main>
      <Navigate
        replace
        state={{ message: "You must login first", pathname }}
        to="/login"
      />
    </main>
  );
}
