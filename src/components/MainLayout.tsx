import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen p-3 justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
