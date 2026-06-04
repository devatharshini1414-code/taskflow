const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      default: "todo",
    },
    priority: {
  type: String,
  default: "Medium",
},
    deadline: String,
    projectId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);