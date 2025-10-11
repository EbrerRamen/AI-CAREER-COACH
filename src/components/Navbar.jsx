import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">AI Career Coach</Link>
            <div className="space-x-4">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <Link to="/upload" className="hover:text-blue-600">Analyze Resume</Link>
            </div>
        </nav>
    );
}