
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/entities/user/model/selectors";

interface PrivateRouteProps {
  component: React.ReactElement;
  redirectTo?: string;
}

export const PrivateRoute = ({ component, redirectTo = "/login" }: PrivateRouteProps) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};