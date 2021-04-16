const express = require('express');
const Task = require('./model');

const router = express.Router();

function cleanTask(task) {
  if (task.task_completed !== undefined) {
    task.task_completed = Boolean(task.task_completed);
  }
}

router.get('/', (req, res, next) => {
  Task.getAll()
    .then(tasks => {
      tasks.forEach(cleanTask);
      res.status(200).json(tasks);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Task.create(req.body)
    .then(task => {
      cleanTask(task);
      res.status(201).json(task);
    })
    .catch(err => next(err));
});

module.exports = router;
