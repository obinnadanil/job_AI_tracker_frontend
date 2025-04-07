'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/api/job`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setJobs(res.data.jobs);
      } catch (error) {
        toast.error("Failed to fetch job applications");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    console.log(id);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/api/job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job.id !== id));
      toast.success("Job application deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete job application");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Job Applications</h2>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Job Title</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="border p-2">{job.job_title}</td>
                    <td className="border p-2">{job.company}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${job.status === "Applied"
                            ? "bg-blue-500"
                            : job.status === "Interview Scheduled"
                              ? "bg-yellow-500"
                              : job.status === "Offer Received"
                                ? "bg-green-500"
                                : "bg-red-500"
                          }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="border p-2 flex gap-4">
                      <button
                        onClick={() => router.push(`/job-form/${job.id}`)}
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No job applications added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
