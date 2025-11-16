import { useEffect, useState } from "react";
import AddTaskModal from "../components/AddTaskModal";
import { apiRequest } from "../utils/api";

export default function Tasks() {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const result = await apiRequest("/tasks", "GET", null, token);
    if (Array.isArray(result)) setTasks(result);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status !== "completed";
    if (filter === "completed") return task.status === "completed";
    if (filter === "today") {
      return (
        task.dueDate?.substring(0, 10) ===
        new Date().toISOString().substring(0, 10)
      );
    }
    return true;
  });

  const startEdit = (task) => {
    setEditTask(task);
    setOpenModal(true);
  };

  const deleteTask = async (id) => {
    await apiRequest(`/tasks/${id}`, "DELETE", null, token);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tasks 📋</h1>

        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
          onClick={() => setOpenModal(true)}
        >
          + Add Task
        </button>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-10">
        {["all", "pending", "completed", "today"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-medium capitalize ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TASK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTasks.map((task) => (
          <div key={task._id} className="neon-card p-6">
            <h3 className="text-2xl font-bold text-white">{task.title}</h3>
            <p className="text-gray-300 mt-2">{task.description}</p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-400">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>

              <div className="flex gap-4">
                <button
                  onClick={() => startEdit(task)}
                  className="text-blue-300 hover:text-blue-400"
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-300 hover:text-red-400"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AddTaskModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditTask(null);
        }}
        existingTask={editTask}
        onSave={(task) => {
          if (editTask) {
            // Update existing task (including completed status)
            setTasks((prev) =>
              prev.map((t) =>
                t._id === task._id ? { ...task, status: task.status } : t
              )
            );
          } else {
            // Add new task
            const newTask = {
              ...task,
              _id: Date.now().toString(), // temporary UI id
            };

            setTasks((prev) => [...prev, newTask]);
          }

          setOpenModal(false);
        }}
      />
    </div>
  );
}
