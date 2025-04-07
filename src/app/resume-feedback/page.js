"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResumeFeedback() {
    const [resumeText, setResumeText] = useState("");
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  
    const handleResumeTextChange = (e) => {
        setResumeText(e.target.value);
    };

    const handleFetchFeedback = async () => {
        if (!resumeText.trim()) {
            toast.error("Please enter your resume text.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${baseUrl}/api/resume/feedback`,
                { resume_text: resumeText },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setFeedback(response.data.feedback);
            toast.success("Resume feedback fetched successfully!");
        } catch (error) {
            toast.error("Failed to fetch resume feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Resume Feedback</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <label htmlFor="resumeText" className="block text-lg font-medium text-gray-700">
                    Paste Your Resume Text Below
                </label>
                <textarea
                    id="resumeText"
                    className="mt-2 border border-gray-300 p-4 rounded-md w-full h-48 resize-none"
                    placeholder="Paste your resume content here..."
                    value={resumeText}
                    onChange={handleResumeTextChange}
                ></textarea>
                <button
                    onClick={handleFetchFeedback}
                    className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                    Get Resume Feedback
                </button>
            </div>

            {loading ? (
                <div>Loading resume feedback...</div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
                    {feedback.length > 0 ? (
                        <ul className="space-y-2">
                            {feedback.map((item, index) => (
                                <li key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No feedback available for the provided resume.</p>
                    )}
                </div>
            )}
        </div>
    );
}
