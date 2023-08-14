import React, { useState } from "react";
import axios from 'axios';
import './App.css';

function Gpt3Form() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [interviewType, setInterviewType] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleInterviewTypeChange = (event) => {
        setInterviewType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const serverResponse = await axios.post('http://localhost:3001/api/ask', { text });
        setResponse(serverResponse.data);
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen p-4">
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-purple-600">AI Interview Coach</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">John Doe</span>
                        <img src="path_to_image.jpg" alt="User profile" className="h-10 w-10 rounded-full" />
                    </div>
                </div>
            </nav>
            <div className="max-w-2xl w-full mx-auto mt-20 bg-white p-6 rounded-xl shadow-md space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <textarea
                            value={text}
                            onChange={handleChange}
                            placeholder="Paste your resume text..."
                            className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200 resize-y lg:flex-1"
                            rows="5"
                        ></textarea>
                        <textarea
                            value={jobDescription}
                            onChange={handleJobDescriptionChange}
                            placeholder="Paste the job description..."
                            className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200 resize-y lg:flex-1"
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input type="radio" id="hr" name="interviewType" value="hr" checked={interviewType === "hr"} onChange={handleInterviewTypeChange} />
                            <label htmlFor="hr">HR</label>
                        </div>
                        <div>
                            <input type="radio" id="technical" name="interviewType" value="technical" checked={interviewType === "technical"} onChange={handleInterviewTypeChange} />
                            <label htmlFor="technical">Technical</label>
                        </div>
                        <div>
                            <input type="radio" id="behavioral" name="interviewType" value="behavioral" checked={interviewType === "behavioral"} onChange={handleInterviewTypeChange} />
                            <label htmlFor="behavioral">Behavioral</label>
                        </div>
                        <div>
                            <input type="radio" id="combo" name="interviewType" value="combo" checked={interviewType === "combo"} onChange={handleInterviewTypeChange} />
                            <label htmlFor="combo">Combo</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold rounded-md shadow-md hover:shadow-xl transition duration-200 transform hover:scale-105"
                    >
                        Evaluate
                    </button>
                </form>
                {response && (
                    <div className="p-4 mt-4 bg-blue-200 rounded-md shadow-inner space-y-2">
                        <h3 className="text-lg font-medium text-blue-800">Feedback:</h3>
                        <p className="text-gray-800">{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gpt3Form;
