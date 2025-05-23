import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const savedToken = localStorage.getItem("token");

  if (!savedToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
