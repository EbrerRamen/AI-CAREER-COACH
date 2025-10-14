import {Link} from "react-router-dom";
import {motion} from "framer-motion";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <motion.h1 
            initial={{opacity:0, y: -20}}
            animate={{opacity:1, y: 0}}
            transition={{duration: 0.6}}
            className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Personal <span className="text-yellow-400">AI Career Coach</span>
            </motion.h1>
            <motion.p 
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.6}}
            className="text-gray-700 max-w-xl mb-8 text-lg">
                Upload your resume and let AI craft your perfect cover letter, generate interview question, 
                and help you stand out - all in minutes.
            </motion.p>

            {/* Button */}
            <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: 0.4, duration: 0.5}}
            >
            <Link
            to="/upload">
                <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300">
                    Get Started 🚀
                </button>
            </Link>
            </motion.div>

            {/* Subtle background desgin */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-40 left-1/4 w-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

        </div>
    );
}

export default Home;