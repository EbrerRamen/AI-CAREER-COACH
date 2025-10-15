import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Result() {
    const {state} = useLocation();
    const analysis = state?.analysis || "";
    const [coverLetter, setCoverLetter] = useState("");
    const [questions, setQuestions] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const generateCoverLetter = async () => {
        if (!jobTitle) return alert("Enter a job title first.");
        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:5000/generate_cover_letter", {
                job_title: jobTitle,
                resume_text: analysis,
            });
            setCoverLetter(res.data.cover_letter);
        } catch (err) {
            console.error(err);
            alert("Error generating cover letter.");
        } finally {
            setLoading(false);
        }
    };

    const generateInterviewQuestions = async () => {
        if (!jobTitle) return alert("Enter a job title first.");
        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:5000/generate_interview_questions", {
                job_title: jobTitle,
            });
            setQuestions(res.data.questions);
        } catch (err) {
            console.error(err);
            alert("Error generating interview questions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden p-6">
            <h1 className="text-2xl font-bold mb-4">Resume Analysis</h1>
            <p className="border p-4 rounded mb-6 bg-gray-50 whitespace-pre-line">{analysis}</p>

            <div className="mb-4">
                <input
                type="text"
                placeholder="Enter Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="border p-2 rounded w-full mb-2"
                />
                <div className="flex gap-4">
                    <button
                    onClick={generateCoverLetter}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg=green-700"
                    >
                        {loading ? "Generating..." : "Generate Cover Letter"}
                    </button>
                    <button
                    onClick={generateInterviewQuestions}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        {loading ? "Generating..." : "Generate Questions"}
                    </button>
                </div>
            </div>

            {coverLetter && (
                <>
                <h2 className="text-xl font-semibold mt-6 mb-2">Generated Cover Letter</h2>
                <p className="border p-4 rounded bg-gray-50 whitespace-pre-line">{coverLetter}</p>
                </>
            )}
            {questions && (
                <>
                <h2 className="text-xl font-semibold mt-6 mb-2">Interview Questions</h2>
                <p className="border p-4 rounded bg-gray-50 whitespace-pre-line">{questions}</p>
                </>
            )}
        </div>
    );
}

export default Result;