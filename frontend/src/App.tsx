import "./App.css";
import Footer from "./components/Footer";
import HeaderNavBar from "./components/HeaderNavBar";
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
