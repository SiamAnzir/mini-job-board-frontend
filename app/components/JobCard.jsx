import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`} className="block">
      <div
        className="
          bg-white 
          rounded-xl 
          shadow-md 
          hover:shadow-lg 
          transition 
          duration-300 
          ease-in-out 
          p-6 
          border 
          border-gray-200 
          hover:border-green-800
          transform 
          hover:-translate-y-1
        "
      >
        <h2 className="text-xl font-bold text-green-800 mb-2 truncate">
          {job.title}
        </h2>

        <p className="text-gray-700 font-medium">{job.company}</p>

        <div className="flex items-center mt-2 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 mr-1 text-green-800"
          >
            <path
              fillRule="evenodd"
              d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
              clipRule="evenodd"
            />
          </svg>
          {job.location}
        </div>

        <div className="mt-4">
          <span className="text-green-800 text-sm font-semibold underline hover:no-underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
