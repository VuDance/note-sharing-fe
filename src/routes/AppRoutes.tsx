import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import SignUpPage from "../features/auth/pages/SignUpPage";
import HomePage from "../features/main/pages/HomePage";
import MainLayout from "../layout/MainLayout";
import EditNotePage from "@/features/main/pages/EditNotePage";

const AppRoutes = () => (
  <Routes>
    <Route>
      <Route path="register" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit-note/:id" element={<EditNotePage />} />
      {/* Add other routes here */}
    </Route>
    {/* Các route khác */}
  </Routes>
);

export default AppRoutes;
