const Task = require("../models/Task");
const dayjs = require("dayjs");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      userId: req.user,
      ...req.body
    });

    res.json(newTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET TASKS DUE TODAY
exports.getTasksDueToday = async (req, res) => {
  try {
    const todayStart = dayjs().startOf("day");
    const todayEnd = dayjs().endOf("day");

    const tasks = await Task.find({
      userId: req.user,
      dueDate: { $gte: todayStart.toDate(), $lte: todayEnd.toDate() },
      status: "pending"
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
