//import { Home } from "lucide-react";
import Home from "./pages/Home";
import "./App.css";
import Footer from "./components/Footer";
import HeaderNavBar from "./components/HeaderNavBar";

function App() {
  return (
    <div className="container mx-auto h-screen flex flex-col">
      <HeaderNavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
