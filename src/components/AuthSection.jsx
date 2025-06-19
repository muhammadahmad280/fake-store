import React, { useState } from "react";

function AuthSection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
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
        // In a real app, you'd store the token (e.g., in localStorage) and redirect the user.
        setMessage(`Login successful! Token received.`); // Simplified token display for security
        // console.log("Login successful! Token:", data.token); // Log token for debugging
      } else {
        setMessage(
          `Login failed: ${
            data.msg || data.message || "Invalid credentials or unknown error"
          }. Please try again.`
        );
      }
    } catch (error) {
      console.error("Network or API error during login:", error); // Log the actual error
      setMessage(
        `Network error: Could not connect to the server. Please check your internet connection.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm">
            Welcome Back!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                autoComplete="username"
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.01]"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.000 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Test Credentials Display */}
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
            <p className="font-semibold mb-1">For Testing:</p>
            <p>
              **Username:** <span className="font-mono text-blue-700 dark:text-blue-300">mor_2314</span>
            </p>
            <p>
              **Password:** <span className="font-mono text-blue-700 dark:text-blue-300">83r5^_</span>
            </p>
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg text-center font-medium shadow-md animate-fade-in-down ${
              message.includes("successful")
                ? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100 border border-green-200 dark:border-green-700"
                : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100 border border-red-200 dark:border-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthSection;