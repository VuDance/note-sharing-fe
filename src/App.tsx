import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        hideProgressBar={false}
        newestOnTop
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
