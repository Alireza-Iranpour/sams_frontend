import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const LoggedInRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Navigate to="/workspaces" replace={true} />
  ) : (
    <Outlet />
  );
};

export default LoggedInRoutes;
