import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthRequired() {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  if (currentUser) {
    return <Outlet />;
  }

  return (
    <Navigate
      replace
      state={{ message: "You must login first", pathname }}
      to="/login"
    />
  );
}
