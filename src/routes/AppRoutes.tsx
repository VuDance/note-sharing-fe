import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../features/main/pages/HomePage";
import MainLayout from "../components/MainLayout";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
    </Route>
    {/* Các route khác */}
  </Routes>
);

export default AppRoutes;
