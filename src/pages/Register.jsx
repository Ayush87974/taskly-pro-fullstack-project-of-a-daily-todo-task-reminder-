import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const result = await apiRequest("/auth/register", "POST", {
      name,
      email,
      password,
    });

    if (result?.msg === "User registered successfully") {
      navigate("/login");
    } else {
      alert(result?.msg || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-red-200 flex items-center justify-center p-6">

      <div className="flex bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden w-[900px]">

        {/* Left Side — Quote */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-purple-600 text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-snug">
            “Every big journey starts with a small step.
            Your step begins here.”
          </h2>
          <p className="mt-6 text-lg opacity-80">
            Join <strong>Taskly Pro</strong> and unlock a smarter way to organize your day.
          </p>
        </div>

        {/* Right Side — Register Form */}
        <div className="w-1/2 p-12">
          <h1 className="text-3xl font-bold mb-8">Create an account</h1>

          <form onSubmit={handleRegister} className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Register
            </button>

          </form>

          <p className="mt-6 text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
