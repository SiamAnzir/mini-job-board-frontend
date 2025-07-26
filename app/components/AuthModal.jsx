"use client";
import { useState } from "react";
import { successToastMessage } from "../utils/toastifyUtils";

const AuthModal = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/${
          isLogin ? "login" : "register"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.token && isLogin) {
        localStorage.setItem("token", data.token);
        successToastMessage("User Logged in Successfully");
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
        onClose();
      } else {
        toggleMode();
        successToastMessage(
          "User Registered Successfully. Now Login to Continue"
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/20 px-4">
      <div className="relative w-full max-w-md bg-white text-black border border-green-800 rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-semibold mb-1">User Name</label>
          <input
            type="text"
            name="username"
            placeholder="e.g : admin"
            className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-semibold mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-green-800"
              tabIndex={-1} // prevents focus jump
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.25 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.75 0 8.774 3.162 10.066 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228L21 21"
                  />
                </svg>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {loading && (
            <div className="my-3 flex justify-center">
              <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-800/90"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-sm text-center mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-primary font-semibold underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
