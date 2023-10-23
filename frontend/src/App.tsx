import "./App.css";
import Footer from "./layout/Footer";
import HeaderNavBar from "./layout/HeaderNavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container mx-auto h-screen flex flex-col">
      <HeaderNavBar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
