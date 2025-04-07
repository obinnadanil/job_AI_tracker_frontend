"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import JobApplicationForm from "../job-form/[id]/page";

export default function JobRecommendations() {
  const [skills, setSkills] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [isFormOpen, setFormOpen] = useState(false);

  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const fetchJobRecommendations = async () => {
    if (!skills.trim()) {
      toast.error("Please enter your skills.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/jobs/recommendations",
        { skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendedJobs(res.data.jobs);
      toast.success("Job recommendations fetched!");
    } catch (error) {
      toast.error("Failed to fetch job recommendations.");
    }
  };

  const openApplicationForm = (job) => {
    setSelectedJob(job);
    setFormOpen(true);
  };

  const closeApplicationForm = () => {
    setFormOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Job Recommendations</h1>
      
      <div className="mb-6">
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-md w-full"
          placeholder="Enter comma-separated skills"
          value={skills}
          onChange={handleSkillsChange}
        />
        <button
          onClick={fetchJobRecommendations}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Get Recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedJobs.length > 0 ? (
          recommendedJobs.map((job) => (
            <div key={job.url} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{job.job_title}</h2>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
              {/* <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline mt-2 inline-block"
              >
                Apply Now
              </a> */}
              <button
                onClick={() => openApplicationForm(job)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Apply
              </button>
            </div>
          ))
        ) : (
          <p>No job recommendations available.</p>
        )}
      </div>

      {isFormOpen && (
        <JobApplicationForm job={selectedJob} closeForm={closeApplicationForm} />
      )}
    </div>
  );
}

