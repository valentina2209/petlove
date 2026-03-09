import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/entities/user/model/selectors";

export const PublicRoute = ({ component, redirectTo = "/profile" }: { component: React.ReactNode; redirectTo?: string }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : <>{component}</>;
};