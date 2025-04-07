"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function JobApplicationForm({ job: propJob }) {
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [job, setJob] = useState(propJob || null);



  const router = useRouter();
  const { id } = useParams() || {};
  const isUpdating = !!id && !propJob;


  useEffect(() => {
    if (isUpdating) {

      const fetchJobApplication = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/api/job/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const jobData = response.data.job;
          console.log(jobData);
          setJob(jobData);
          setStatus(jobData.status);
          setNotes(jobData.notes);
          setTitle(jobData.job_title);
        } catch (error) {
          toast.error("Failed to fetch job application details.");
        }
      };

      fetchJobApplication();
    }
    else if (propJob) {
      setJob(propJob);
      setTitle(propJob.job_title);
    }
  }, [id, propJob, isUpdating]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJob((prevJob) => ({
      ...prevJob,
      title: e.target.value,
    }));
  };

  const handleCompanyChange = (e) => {
    setJob((prevJob) => ({
      ...prevJob,
      company: e.target.value,
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!notes.trim()) {
      toast.error("Please add notes for the application.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (isUpdating) {
        await axios.patch(
          `http://localhost:5000/api/job/${id}`,
          {
            status,
            notes,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Job application updated!");
      } else {

        await axios.post(
          "http://localhost:5000/api/job",
          {
            job_title: job.job_title,
            company: job.company,
            status,
            applied_date: new Date().toISOString().split("T")[0],
            notes,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Job application submitted!");
      }

      closeForm();
    } catch (error) {
      toast.error("Failed to submit job application.");
    }
  };

  const closeForm = () => {
    router.push("/job-listing");
  };

  if (!job && isUpdating) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {isUpdating ? `Update Application for ${job?.job_title}` : `Apply for ${job?.job_title}`}
        </h2>

        <form onSubmit={handleSubmitApplication}>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-lg font-medium text-gray-700">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={job?.job_title || ""}
              onChange={handleJobTitleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block text-lg font-medium text-gray-700">
              Company
            </label>
            <input
              id="company"
              type="text"
              value={job?.company || ""}
              onChange={handleCompanyChange}

              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-lg font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md h-32 resize-none"
              placeholder="Add any notes about the application..."
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              {isUpdating ? "Update Application" : "Submit Application"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
