const express = require('express');
const Task = require('../models/Task'); // replace with the path to your Task model
const router = express.Router();


router.post('/', async (req, res) => {
  const task = new Task({
    label: req.body.label,
    // done is not included because it will default to false
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

router.delete('/:id', async (req, res) => {
  try {
      const task = await Task.deleteOne({ _id: req.params.id });
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }
      res.json(task);
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    
    if (!task) {
      res.status(404).json({ message: 'Task not found.' });
      return;
    }

    if (req.body.label) {
      task.label = req.body.label;
    }

    if (req.body.done !== undefined) {
      task.done = req.body.done;
    }

    await task.save();
    console.log('Task edited:', task._id);

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;