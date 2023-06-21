//import { Home } from "lucide-react";
import "./App.css";
import Footer from "./components/Footer";
import HeaderNavBar from "./components/HeaderNavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto h-screen flex flex-col">
      <HeaderNavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
