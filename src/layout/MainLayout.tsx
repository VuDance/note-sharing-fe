import { Outlet } from "react-router-dom";
<<<<<<< HEAD:src/components/MainLayout.tsx
=======
import Header from "../components/Header";
import Footer from "../components/Footer";
>>>>>>> 889bc1d2a9fec4d08390dbdf6c3f35739d617327:src/layout/MainLayout.tsx

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen justify-between">
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
