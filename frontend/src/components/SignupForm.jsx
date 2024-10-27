import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("player");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e", email, role);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        {
          username,
          email,
          password,
          role,
        }
      );
      console.log(response);
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
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 py-4 lg:py-12 px-4">
      <div className="flex flex-col items-center justify-center text-white w-full max-w-md lg:max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            Sign Up
          </button>

          {error && (
            <p className="text-red-500 text-sm font-semibold mt-4">{error}</p>
          )}

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={redirectToLogin}
              className="text-yellow-300 hover:text-yellow-400 underline"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
