const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    // const newTask = req.body;
    const user=req.user._id
    const newTask = new Task({...req.body,user});
    const savedTask = await newTask.save();
    res.status(200).json({ task: savedTask });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({task:updatedTask});
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.body.id;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createTask, getAllTask, updateTask, deleteTask };
