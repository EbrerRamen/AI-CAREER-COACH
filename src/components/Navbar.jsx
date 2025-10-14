import {Link, useLocation} from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const navLinks = [
        {path: "/", label: "Home" },
        {path: "/upload", label: "Analyze Resume" },
        {path: "/results", label: "Results" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo / Brand */}
                <Link to="/" className="text-white text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity duration-200">Career<span className="text-yellow-300">AI</span></Link>
            {/*Links*/}
            <div className="flex space-x-6">
                {navLinks.map((link) => (
                    <Link
                    key={link.path}
                    to={link.path}
                    className={`text-white/90 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/20 ${
                    location.pathname === link.path ? "bg-white/20 backdrop-blur-md" : ""    
                    }`}
                    >
                        {link.label}
                        </Link>
                ))}
            </div>
            

            {/* Call to Action */}
            <Link
            to="/upload"
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-xl shadow hover:bg-indigo-50 transition-all duration-200"
            >
                Get Started
            </Link>
            </div>
        </nav>
    );
}