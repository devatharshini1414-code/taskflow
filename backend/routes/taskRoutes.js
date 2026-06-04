const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

// Create task
router.post("/", protect, createTask);

// Get tasks by project
router.get("/:projectId", protect, getTasks);

// Update status
router.put("/:id", protect, updateTaskStatus);

// Delete task
router.delete("/:id", protect, deleteTask);

module.exports = router;