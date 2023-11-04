import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const StudentPrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { role } = user || {};
  const isLoggeIn = useAuth();

  return isLoggeIn && role === "student" ? (
    children
  ) : (
    <Navigate to="/profile" />
  );
};

export default StudentPrivateRoute;
