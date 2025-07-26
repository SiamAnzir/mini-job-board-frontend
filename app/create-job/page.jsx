"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { errorToastMessage, successToastMessage } from "../utils/toastifyUtils";

export default function CreateJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    requiredSkills: "",
    responsibilities: "",
    experience: "",
    education: "",
    additionalRequirements: "",
    salary: "",
    location: "",
    benefits: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            requiredSkills: formData.requiredSkills
              .split(",")
              .map((s) => s.trim()),
            responsibilities: formData.responsibilities
              .split(",")
              .map((r) => r.trim()),
          }),
        }
      );

      const data = await res.json();
      setLoading(false);
      if (!res.ok) throw new Error(data.message || "Failed to create job");

      successToastMessage("Job created successfully!");
      setFormData({
        title: "",
        description: "",
        company: "",
        requiredSkills: "",
        responsibilities: "",
        experience: "",
        education: "",
        additionalRequirements: "",
        salary: "",
        location: "",
        benefits: "",
        deadline: "",
      });
    } catch (err) {
      setLoading(false);
      errorToastMessage(err.message);
    }
  };

  return (
    <div className="mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Create New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="e.g., Frontend Developer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="Company name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            rows={4}
            placeholder="Brief description of the job"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Required Skills{" "}
            <span className="text-gray-500">(comma-separated)</span>
          </label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Responsibilities{" "}
            <span className="text-gray-500">(comma-separated)</span>
          </label>
          <input
            type="text"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="List main job responsibilities"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Experience Requirements
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="e.g., 2+ years"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Educational Requirements
          </label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="e.g., Bachelors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Additional Requirements
          </label>
          <input
            type="text"
            name="additionalRequirements"
            value={formData.additionalRequirements}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="Any extra requirements"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="45000 - 60000 BDT"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Job Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Compensation & Benefits
          </label>
          <input
            type="text"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            placeholder="Health insurance, bonuses"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Application Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
          />
        </div>

        {loading && (
          <div className="my-3 flex justify-center">
            <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full lg:w-1/2 bg-green-800 text-white text-xl p-2 rounded hover:bg-green-800/90"
          >
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
}
