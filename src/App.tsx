import React, { useState } from "react";
import axios from 'axios';
import './styles.css';

function Gpt3Form() {
  const [text, setText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [response, setResponse] = useState("");

  // You might need more state variables for other inputs such as interview round/style

  const handleChange = (event) => {
    setText(event.target.value); // For the resume text
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value); // For the job description
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serverResponse = await axios.post('http://localhost:3001/api/ask', { text });
    setResponse(serverResponse.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
        {/* Navigation and other components here ... */}

        <div className="flex justify-center mt-10">
            <div className="max-w-xl w-full bg-white shadow-md rounded-md p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Enter your resume text:</span>
                        <input type="text" value={text} onChange={handleChange} className="w-full mt-2 p-2 border rounded" placeholder="Resume text..." />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Enter job description:</span>
                        <input type="text" value={jobDescription} onChange={handleJobDescriptionChange} className="w-full mt-2 p-2 border rounded" placeholder="Job description..." />
                    </label>
                    {/* Other input fields (interview rounds/styles) here ... */}
                    <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enter</button>
                </form>

                {response && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Response:</h3>
                        <p className="text-gray-700 border-t pt-2">{response}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default Gpt3Form;
