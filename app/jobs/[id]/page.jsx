"use client";

import ApplyModal from "@/app/components/ApplyModal";
import { useEffect, useState, use } from "react";
import { ToastContainer } from "react-toastify";

export const dynamic = "force-dynamic";

async function getJob(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return { error: "Job Not Found" };
  return res.json();
}

export default function JobDetails({ params }) {
  const { id } = use(params);
  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getJob(id).then(setJob);
  }, [id]);

  if (!job)
    return (
      <div className="flex justify-center">
        <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (job.error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Job not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-lg text-gray-600">{job.company}</p>
        <p className="text-sm text-gray-500">{job.location}</p>

        {job.salary && (
          <p className="text-green-600 font-medium mt-2">
            Salary: {job.salary}
          </p>
        )}

        <p className="text-sm text-gray-500">
          Deadline:{" "}
          <span className="font-semibold">
            {new Date(job.deadline).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>
      </div>

      {job.requiredSkills?.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {job.responsibilities?.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {job.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        {job.experience && (
          <p className="mb-2">
            <strong>Experience:</strong> {job.experience}
          </p>
        )}
        {job.education && (
          <p className="mb-2">
            <strong>Education:</strong> {job.education}
          </p>
        )}
        {job.additionalRequirements && (
          <p className="mb-2">
            <strong>Additional Requirements:</strong>{" "}
            {job.additionalRequirements}
          </p>
        )}
        {job.benefits && (
          <p className="mb-2">
            <strong>Benefits:</strong> {job.benefits}
          </p>
        )}
      </div>

      <div className="text-center w-full">
        <button
          className="w-1/3 bg-green-800 text-white text-xl px-5 py-2 rounded hover:bg-green-800/90"
          onClick={() => setShowModal(true)}
        >
          Apply Now
        </button>
      </div>

      {showModal && (
        <ApplyModal setShowModal={setShowModal} job={job} jobId={id} />
      )}
    </div>
  );
}
