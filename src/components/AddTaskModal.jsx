import { useEffect, useState } from "react";

export default function AddTaskModal({ open, onClose, onSave, existingTask }) {
  if (!open) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  // When editing, load task values
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || "");
      setDescription(existingTask.description || "");
      setPriority(
        existingTask.priority
          ? existingTask.priority.charAt(0).toUpperCase() +
              existingTask.priority.slice(1)
          : "Medium"
      );
      setDueDate(
        existingTask.dueDate ? existingTask.dueDate.slice(0, 10) : ""
      );
      setCompleted(existingTask.status === "completed");
    }
  }, [existingTask]);

  const handleSubmit = () => {
    if (!title) return alert("Title is required!");

    const newTask = {
      ...existingTask,
      title,
      description,
      priority,
      dueDate,
      status: completed ? "completed" : "pending"
    };

    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

        <h2 className="text-2xl font-bold mb-5 text-black">
          {existingTask ? "Edit Task" : "Add New Task"}
        </h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-3 border rounded-lg mb-4 text-black placeholder:text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-lg mb-4 text-black placeholder:text-black"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Priority */}
        <select
          className="w-full p-3 border rounded-lg mb-4 text-black"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option className="text-black">High</option>
          <option className="text-black">Medium</option>
          <option className="text-black">Low</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          className="w-full p-3 border rounded-lg mb-6 text-black"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Mark Completed */}
        <label className="flex items-center gap-3 text-black mb-6">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="h-5 w-5"
          />
          <span className="text-lg">Mark as Completed</span>
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {existingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
