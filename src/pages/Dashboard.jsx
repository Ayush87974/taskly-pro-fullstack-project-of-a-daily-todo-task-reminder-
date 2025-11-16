import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    today: 0,
  });

  const [recent, setRecent] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const tasks = await apiRequest("/tasks", "GET", null, token);
    if (!tasks || !Array.isArray(tasks)) return;

    const todayDate = new Date().toISOString().split("T")[0];

    const todayTasks = tasks.filter(
      (t) => t.dueDate?.split("T")[0] === todayDate
    );

    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status !== "completed").length;

    setStats({
      pending,
      completed,
      today: todayTasks.length,
    });

    setRecent(tasks.slice(-5).reverse());
  }

  return (
    <div className="min-h-screen relative p-10 overflow-hidden dashboard-bg">

      {/* Background Orbs */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      {/* Welcome Section */}
      <div className="mb-12 relative z-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
          Hello, Ayush 👋
        </h1>
        <p className="text-xl text-gray-200 mt-2">
          Here's your productivity overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

        <div className="neon-card">
          <h2 className="card-title">Pending Tasks</h2>
          <p className="card-value text-red-400">{stats.pending}</p>
        </div>

        <div className="neon-card">
          <h2 className="card-title">Completed</h2>
          <p className="card-value text-green-400">{stats.completed}</p>
        </div>

        <div className="neon-card">
          <h2 className="card-title">Today’s Tasks</h2>
          <p className="card-value text-blue-400">{stats.today}</p>
        </div>

      </div>

      {/* Productivity Score Widget */}
      <div className="mt-14 neon-card relative z-10 p-10">
        <h3 className="text-3xl font-bold text-white mb-4">
          Productivity Score
        </h3>

        <div className="w-full bg-white/10 h-4 rounded-full">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-400"
            style={{ width: `${(stats.completed / (stats.completed + stats.pending || 1)) * 100}%` }}
          ></div>
        </div>

        <p className="text-gray-200 mt-4 text-lg">
          You are doing great today — keep going! 🚀
        </p>
      </div>

      {/* Recent Tasks */}
      <h2 className="mt-14 mb-6 text-4xl font-bold text-white relative z-10">
        Recent Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {recent.map((task) => (
          <div
            key={task._id}
            className="recent-task-card"
          >
            <h3 className="text-2xl font-bold text-white">{task.title}</h3>
            <p className="text-gray-300 mt-2">{task.description}</p>

            <p className="text-sm text-gray-400 mt-3">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <span
              className={
                "inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium " +
                (task.status === "completed"
                  ? "bg-green-600/40 text-green-200"
                  : "bg-yellow-600/40 text-yellow-200")
              }
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Quote */}
      <p className="text-xl text-gray-200 mt-20 italic text-center relative z-10">
        “Success is the sum of small efforts repeated day in and day out.”
      </p>
    </div>
  );
}
