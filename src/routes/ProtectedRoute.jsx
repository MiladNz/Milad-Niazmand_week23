import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function ProtectedRoute({ children }) {
  // const savedToken = localStorage.getItem("token");
  const savedToken = getCookie("token");

  if (!savedToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
