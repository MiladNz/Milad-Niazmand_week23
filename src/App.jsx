import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Toast from "./components/Toast";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
