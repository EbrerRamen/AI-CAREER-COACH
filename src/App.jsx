import {BrowserRouter as Router, Routes, Route} from "react-route-dom";
import Home from "./pages/Home";
import ResumeUpload from "./pages/ResumeUpload";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;