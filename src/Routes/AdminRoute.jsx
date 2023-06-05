import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import useAdmin from "../hooks/useAdmin";
import NotFound from "../pages/NotFound/NotFound";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isLoading] = useAdmin();

  if (loading || isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <NotFound></NotFound>;
};

export default AdminRoute;
