import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 overflow-hidden">

            {/* Content Container */}
            <div className="relative z-10">
                {/* Main Heading */}
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                >
                    Your Personal <span className="text-yellow-400">AI Career Coach</span>
                </motion.h1>

                {/* Description */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-white max-w-xl mb-8 text-lg"
                >
                    Upload your resume and let AI craft your perfect cover letter, generate interview questions, 
                    and help you stand out - all in minutes.
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link to="/upload">
                        <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300">
                            Get Started 🚀
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Floating Glowing Blobs */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Left Top Blob */}
                <motion.div
                    className="absolute w-80 h-80 bg-indigo-400/50 rounded-full filter blur-3xl"
                    animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                    style={{ top: "10%", left: "15%" }}
                />
                {/* Right Bottom Blob */}
                <motion.div
                    className="absolute w-96 h-96 bg-pink-400/50 rounded-full filter blur-3xl"
                    animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
                    style={{ bottom: "10%", right: "10%" }}
                />
                {/* Center Purple Blob */}
                <motion.div
                    className="absolute w-72 h-72 bg-purple-400/40 rounded-full filter blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
                    style={{ top: "30%", left: "50%" }}
                />
            </div>

        </div>
    );
}

export default Home;
