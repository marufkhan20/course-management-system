import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminPrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { role } = user || {};
  const isLoggeIn = useAuth();

  return isLoggeIn && role === "admin" ? (
    children
  ) : (
    <Navigate to="/profile/all-courses" />
  );
};

export default AdminPrivateRoute;
