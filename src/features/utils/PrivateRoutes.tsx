import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const PrivateRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoutes;
