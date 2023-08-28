import React, { useState } from "react";
import axios from 'axios';
import './App.css';
import { teacherResume, teacherJobDescription } from './data/teacherData';
import { superheroResume, superheroJobDescription } from './data/superheroData';

function Gpt3Form() {
  const [userName, setUserName] = useState("");
  const [userResume, setUserResume] = useState("");
  const [profession, setProfession] = useState("");
  const [job, setJob] = useState("");
  const [response, setResponse] = useState<Array<{ role: string, message: string }>>([]);

  const handleResumeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserResume(event.target.value);
  };

  const handleProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfession = event.target.value;
    setProfession(selectedProfession);

    if (selectedProfession === "teacher") {
        setUserResume(teacherResume);
        setJob(teacherJobDescription);
    }
    if (selectedProfession === "superhero") {
        setUserResume(superheroResume);
        setJob(superheroJobDescription);
    }
  };

  const handleJobChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJob(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resume = userResume || profession;
    const serverResponse = await axios.post('http://localhost:3000/api/ask', { userName, resume, job });
    const responseText = serverResponse.data.response;

    const parsedResponses = responseText.split(/(Interviewer:|Interviewee:)/).slice(1);
    const pairedResponses: Array<{ role: string, message: string }> = [];

    for (let i = 0; i < parsedResponses.length; i += 2) {
      const role = parsedResponses[i].trim();
      const message = parsedResponses[i + 1].trim();
      pairedResponses.push({
        role: role === 'Interviewee:' ? (userName ? userName : 'You') : 'Interviewer',
        message,
      });
    }

    setResponse(pairedResponses);
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
            value={userResume}
            onChange={handleResumeChange}
            placeholder="Paste your resume text (or choose a profession below)"
            className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200 resize-y lg:flex-1"
            rows={5}
          ></textarea>

          <select value={profession} onChange={handleProfessionChange} className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200">
            <option value="" disabled>Select a Profession</option>
            <option value="teacher">Teacher</option>
            <option value="software_developer">Software Developer</option>
            <option value="chef">Chef</option>
            <option value="waiter">Waiter</option>
            <option value="superhero">Superhero</option>
          </select>

          <textarea
            value={job}
            onChange={handleJobChange}
            placeholder="Paste the job description"
            className="w-full p-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-800 transition duration-200 resize-y lg:flex-1"
            rows={5}
          ></textarea>

          <button type="submit" className="w-full p-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold rounded-md shadow-md hover:shadow-xl transition duration-200 transform hover:scale-105">
            Evaluate
          </button>
        </form>

        {response.length > 0 && (
          <div className="p-4 mt-4 bg-gray-100 rounded-md shadow-inner space-y-2">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Feedback:</h3>
            <div className="space-y-2">
              {response.map((resp, index) => (
                <div key={index} className={`flex ${resp.role !== 'Interviewer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start p-3 rounded-lg ${resp.role === 'Interviewer' ? 'bg-blue-200 text-blue-800' : 'bg-gray-300 text-gray-800'} border ${resp.role !== 'Interviewer' ? 'border-l-8' : 'border-r-8'} max-w-xs`}>
                    <strong>{resp.role}:</strong> {resp.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gpt3Form;
