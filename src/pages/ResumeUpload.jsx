import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ResumeUpload() {
    const [file, setFile] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            // later send file to backend
            navigate("/result");
        } else {
            alert("Please upload your resume first!");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bod mb-4 text-center">Upload Your Resume</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                className="border border-gray-300 p-2 rounded w-full"
                />
                {file && <p className="text-gray-600">📄 {file.name}</p>}
                <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-700 transition"
                >
                    Analyze Resume
                </button>
            </form>
        </div>
    );
}