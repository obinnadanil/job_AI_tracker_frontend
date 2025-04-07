"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login"); 
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6 space-y-8">
        <div className="text-center text-2xl font-bold">Job Tracker</div>
        <div className="space-y-4 flex flex-col">
          <Link href="/dashboard" className="text-lg hover:text-indigo-400 transition duration-200">
            Dashboard
          </Link>
          <Link href="/resume-feedback" className="text-lg hover:text-indigo-400 transition duration-200">
            Resume Feedback
          </Link>
          <Link href="/job-listing" className="text-lg hover:text-indigo-400 transition duration-200">
            Job Listings
          </Link>
          <Link href="/job-recommendations" className="text-lg hover:text-indigo-400 transition duration-200">
            Job Recommendations
          </Link>
          <button
            onClick={handleLogout}
            className="text-2xl text-red-500 hover:text-indigo-400 transition duration-200 mt-4"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to your Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resume Feedback Card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4">Resume Feedback</h2>
              <p className="text-sm mb-4">Get detailed feedback on your resume to improve your chances.</p>
              <Link
                href="/resume-feedback"
                className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                View Feedback
              </Link>
            </div>

            {/* Job Listings Card */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
              <p className="text-sm mb-4">View all the jobs you have applied for and their status.</p>
              <Link
                href="/job-listing"
                className="inline-block bg-white text-teal-600 px-4 py-2 rounded-md font-semibold hover:bg-teal-600 hover:text-white transition-all duration-200"
              >
                View Listings
              </Link>
            </div>

            {/* Job Recommendations Card */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4">Job Recommendations</h2>
              <p className="text-sm mb-4">Discover recommended job opportunities based on your profile.</p>
              <Link
                href="/job-recommendations"
                className="inline-block bg-white text-pink-600 px-4 py-2 rounded-md font-semibold hover:bg-pink-600 hover:text-white transition-all duration-200"
              >
                View Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
