import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import ResumeUpload from "./pages/ResumeUpload";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;