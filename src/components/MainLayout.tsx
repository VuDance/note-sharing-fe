import { Outlet } from "react-router-dom";

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
