import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const result = await apiRequest("/auth/login", "POST", { email, password });

    if (result?.token) {
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      alert(result?.msg || "Login failed");
    }
  }

  return (
<div className="min-h-screen animated-bg flex items-center justify-center p-6 relative overflow-hidden">
{/* Floating Code Symbols */}
<div className="floating-symbol symbol-1">{`</>`}</div>
<div className="floating-symbol symbol-2">{`{ }`}</div>
<div className="floating-symbol symbol-3">{`() => {}`}</div>
<div className="floating-symbol symbol-4">{`<div>`}</div>
<div className="floating-symbol symbol-5">{`</script>`}</div>
<div className="floating-symbol symbol-6">{`const x = 10;`}</div>

      <div className="flex bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden w-[900px]">

        {/* Left Side — Quote */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-blue-600 text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-snug">
            “Productivity is never an accident.
            It is always the result of commitment & focus.”
          </h2>
          <p className="mt-6 text-lg opacity-80">
            Welcome back to <strong>Taskly Pro</strong> — your personal workspace for getting things done.
          </p>
        </div>

        {/* Right Side — Login Form */}
        <div className="w-1/2 p-12">
          <h1 className="text-3xl font-bold mb-8">Login</h1>

          <form onSubmit={handleLogin} className="space-y-6">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>
          

          <p className="mt-6 text-gray-700">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
