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
            <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4 border p-2 rounded w-full"
                />
                <button 
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-700"
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>
            </form>
        </div>
    );
}

export default ResumeUpload;