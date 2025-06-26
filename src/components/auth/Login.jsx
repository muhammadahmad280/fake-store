// AuthSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthSection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
        });

        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(
          `Login failed: ${
            data.msg || data.message || "Invalid credentials"
          }`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Network error during login:", error);
      toast.error("Network error: Could not connect to the server", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
  <ToastContainer />
  <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-200 transition-transform duration-300 hover:scale-[1.015]">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 drop-shadow-sm">
        Welcome Back
      </h1>
      <p className="text-md text-gray-600">Please sign in to continue</p>
    </div>

    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-bold text-black"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="text-black font-medium w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold text-black mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-black font-medium w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 py-3 px-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200">
        <p className="font-medium mb-1">🧪 Test Credentials:</p>
        <p>
          <strong>Username:</strong>{" "}
          <span className="font-mono text-blue-700">mor_2314</span>
        </p>
        <p>
          <strong>Password:</strong>{" "}
          <span className="font-mono text-blue-700">83r5^_</span>
        </p>
      </div>
    </form>
  </div>
</div>

  );
}

export default AuthSection;
