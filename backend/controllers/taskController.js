const Task = require('../models/Task');

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newTask = await Task.create({
      title,
      description,
      user: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        task: newTask
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: 'fail',
        message: 'No task found with that ID or you are not authorized'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        task: updatedTask
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'No task found with that ID or you are not authorized'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};