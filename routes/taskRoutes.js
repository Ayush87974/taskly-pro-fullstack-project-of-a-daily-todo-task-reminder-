const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksDueToday
} = require("../controllers/taskController");

// CREATE TASK
router.post("/", auth, createTask);

// GET ALL TASKS
router.get("/", auth, getTasks);

// UPDATE TASK
router.put("/:id", auth, updateTask);

// DELETE TASK
router.delete("/:id", auth, deleteTask);

// GET TASKS DUE TODAY
router.get("/due/today", auth, getTasksDueToday);

module.exports = router;
