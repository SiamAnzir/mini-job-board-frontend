import { ToastContainer } from "react-toastify";
import JobCard from "./components/JobCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`, {
    cache: "no-store",
  });
  const jobs = await res.json();

  return (
    <div>
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Latest Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
