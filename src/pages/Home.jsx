import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-bold mb-4">
                AI Career Coach
            </h1>
            <p className="text-gray-600 mb-6">
                Upload your resume to get personalized analysis, cover letters, and interview questions.
            </p>
            <Link
            to="/upload">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Get Started
                </button>
            </Link>
        </div>
    );
}

export default Home;