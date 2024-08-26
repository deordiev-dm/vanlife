import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Vans from "./Vans";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
