import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
