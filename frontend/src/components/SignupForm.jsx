import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        {
          username,
          email,
          password,
          isAdmin: isadmin,
        }
      );
      console.log("res", response.status);
      console.log("errrororoor", response.status.error);

      if (response.status === 400) {
        setError(response.data.error);
      } else {
        history("/login");
      }
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.data) {
        setError(
          error.response.data.error || "Signup failed. Please try again."
        );
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const redirectToLogin = () => {
    history("/login");
  };

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <div className="min-h-screen flex flex-col items-center justify-center text-white relative px-4 lg:px-0">
        <div className="lg:w-[600px] md:w-72 w-60 max-w-md z-20">
          <h1 className="text-3xl p-4 text-center font-bold">
            Sign Up <br />
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded shadow-md"
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Admin Role
              </label>
              <select
                value={isadmin}
                onChange={(e) => setIsadmin(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="false">User</option>
                <option value="true">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
            {error && (
              <p className="text-red-500 text-sm font-semibold mt-4">{error}</p>
            )}
            <p className="mt-4 text-sm">
              Already have an account?{" "}
              <button
                onClick={redirectToLogin}
                className="text-yellow-300 underline"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
