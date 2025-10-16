import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Result() {
    const {state} = useLocation();
    const analysis = state?.analysis || "";
    const [coverLetter, setCoverLetter] = useState("");
    const [questions, setQuestions] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [loadingCover, setLoadingCover] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [score, setScore] = useState(null);
    const [loadingScore, setLoadingScore] = useState(false);

    const generateResumeScore = async () => {
        if (!analysis) return; // Ensure resume analysis exists
        setLoadingScore(true);
        try {
            const res = await axios.post("http://127.0.0.1:5000/generate_resume_score", {
                resume_text: analysis, //send the analyzed text
            });
            setScore(res.data);
        } catch (err) {
            console.error(err);
            alert("Error generating resume score.");
        } finally {
            setLoadingScore(false);
        }
    };

    const generateCoverLetter = async () => {
        if (!jobTitle) return alert("Enter a job title first.");
        setLoadingCover(true);
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
            setLoadingCover(false);
        }
    };

    const generateInterviewQuestions = async () => {
        if (!jobTitle) return alert("Enter a job title first.");
        setLoadingQuestions(true);
        try {
            const res = await axios.post("http://127.0.0.1:5000/generate_interview_questions", {
                job_title: jobTitle,
            });
            setQuestions(res.data.questions);
        } catch (err) {
            console.error(err);
            alert("Error generating interview questions.");
        } finally {
            setLoadingQuestions(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden p-6">
            
            {/*Glowing Background*/}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Resume Analysis</h1>
            <div className="border border-white/20 p-4 rounded-lg mb-6 bg-white/5 text-gray-100 prose prose-invert max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>

            <div className="mb-6">
                <input
                type="text"
                placeholder="Enter Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                    onClick={generateCoverLetter}
                    className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all ${
                        loadingCover
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-lg hover:shadow-emerald-500/50"
                    } text-white`}
                    disabled = {loadingQuestions || loadingCover}
                    >
                        {loadingCover ? "Generating..." : "Generate Cover Letter"}
                    </button>

                    <button
                    onClick={generateInterviewQuestions}
                    className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all ${
                        loadingQuestions
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg hover:shadow-pink-500/50"
                    } text-white`}
                    disabled = {loadingQuestions || loadingCover}
                    >
                        {loadingQuestions ? "Generating..." : "Generate Questions"}
                    </button>
                </div>
            </div>
            
            {/* Generated Sections */}
            {coverLetter && (
                <>
                <h2 className="text-2xl font-semibold mt-8 mb-3 text-indigo-300">Generated Cover Letter</h2>
                <p className="border border-white/20 p-4 rounded bg-white/5 text-gray-100 whitespace-pre-line">{coverLetter}</p>
                </>
            )}
            {questions && (
                <>
                <h2 className="text-2xl font-semibold mt-8 mb-3 text-pink-300">Interview Questions</h2>
                <p className="border border-white/20 p-4 rounded bg-white/5 text-gray-100 whitespace-pre-line">{questions}</p>
                </>
            )}
        </div>
        </div>
    );
}

export default Result;