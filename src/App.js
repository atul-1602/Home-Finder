import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Findhome from "./components/Findhome";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route index element={<Home />} />
        <Route path="/findhome" element={<Findhome />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
     
     
      
    </>
  );
}

export default App;
