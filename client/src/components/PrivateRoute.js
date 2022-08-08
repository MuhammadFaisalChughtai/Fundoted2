import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { history } from "_helpers";

export { PrivateRoute };

export default function PrivateRoute({ children }) {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
}
