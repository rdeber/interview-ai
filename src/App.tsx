import React, { useState } from "react";
import axios from 'axios';
import './App.css';

function Gpt3Form() {
    const [userName, setUserName] = useState("");
    const [resume, setresume] = useState("");
    const [job, setJob] = useState("");
    const [response, setResponse] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [interviewType, setInterviewType] = useState("");

    const handleResumeChange = (event) => {
        setresume(event.target.value);
    };

    const handleJobChange = (event) => {
        setJob(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleInterviewTypeChange = (event) => {
        setInterviewType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const serverResponse = await axios.post('http://localhost:3000/api/ask', { resume, job, userName });
        setResponse(serverResponse.data.response);
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen p-4">
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-purple-600">Interview AI</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">John Doe</span>
                        <img src="path_to_image.jpg" alt="User profile" className="h-10 w-10 rounded-full" />
                    </div>
                </div>
            </nav>
            <div className="max-w-2xl w-full mx-auto mt-20 bg-white p-6 rounded-xl shadow-md space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      value={userName}
                      onChange={handleUserNameChange}
                      placeholder="Name"
                      className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200"
                    />
                    <textarea
                        value={resume}
                        onChange={handleResumeChange}
                        placeholder="Paste your resume text"
                        className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200 resize-y lg:flex-1"
                        rows="5"
                    ></textarea>
                    <textarea
                        value={job}
                        onChange={handleJobChange}
                        placeholder="Paste the job description"
                        className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200 resize-y lg:flex-1"
                        rows="5"
                    ></textarea>
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
