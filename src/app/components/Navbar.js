"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Tracking Portal</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">Home/Dashboard</Link>
          <Link href="/job-recommendations" className="hover:underline">Recommendations</Link>
          <Link href="/job-listing" className="hover:underline">Job List</Link>
          <Link href="/resume-feedback" className="hover:underline">Resume Feedback</Link>
        </div>
      </div>
    </nav>
  );
}
