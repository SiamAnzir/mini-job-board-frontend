import { useState } from "react";
import { errorToastMessage, successToastMessage } from "../utils/toastifyUtils";

const ApplyModal = ({ setShowModal, job, jobId }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const cvUrl = formData.get("cvLink");

    const payload = {
      jobId: jobId,
      name: name,
      email: email,
      cv: cvUrl,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setLoading(false);
      if (!res.ok) errorToastMessage(data.message || "Something went wrong");
      successToastMessage("Application submitted successfully!");
      setShowModal(false);
    } catch (err) {
      errorToastMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/20 px-4">
      <div className="relative w-full max-w-md bg-white border border-green-800 rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-xl text-green-800 font-semibold mb-4">
          Apply for {job.title}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder="e.g: Siam"
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            name="name"
            required
          />
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="e.g: test@gmail.com"
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            name="email"
            required
          />
          <label className="block text-sm font-semibold mb-1">
            CV Link or Short Text
          </label>
          <input
            type="url"
            placeholder="e.g: https:// ...."
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            name="cvLink"
            required
          />

          {loading && (
            <div className="my-3 flex justify-center">
              <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-800/90"
            disabled={loading}
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
