import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload a resume file first.");

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setLoading(true);
            const res = await axios.post("http://127.0.0.1:5000/analyze_resume", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            // Send result to Result page
            navigate("/result", {state: {analysis: res.data.analysis, resumeText: "Resume Uploaded"}});
        } catch (err) {
            console.error(err);
            alert("Error analyzing resume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
            {/* Glowing blob background */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
            
            {/* upload Card */}
            <div className="relative z-10 p-8 w-full max-w-md text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-6">Upload Your Resume</h1>
            
            <form onSubmit={handleSubmit} className="sapce-y-5">
                <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0 file:text-sm file:font-semibold
                            file:bg-indigo-600 file:text-white hover:file:bg-indigo-700
                            focus:outline-none"
                />

                <button 
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all
                    ${loading
                        ? "bg-gray-500 cursor-not-allowed" 
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg hover:shadow-purple-500/50"}
                        text-white`}
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>
            </form>
        </div>
        </div>
    );
}

export default ResumeUpload;