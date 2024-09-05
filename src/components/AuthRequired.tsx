import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequired() {
  const auth = localStorage.getItem("isLoggedIn");
  const { pathname } = useLocation();

  if (auth === "true") {
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
