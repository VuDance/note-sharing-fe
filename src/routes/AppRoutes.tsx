import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    {/* Các route khác */}
  </Routes>
);

export default AppRoutes;
