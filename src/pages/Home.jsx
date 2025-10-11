import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
                Your Personal <span className="text-blue-600">AI Career Coach</span>
            </h1>
            <p className="text-gray-600 max-w-xl mb-8">
                Upload your resume and let our AI provide smart insights, improve your cover letter and prepare you for interviews.
            </p>
            <Link
            to="/upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transiotion"
            >
                Get Started
            </Link>
        </div>
    );
}