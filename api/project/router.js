const express = require('express');
const Project = require('./model');

const router = express.Router();

function cleanProject(project) {
  if (project.project_completed !== undefined) {
    project.project_completed = Boolean(project.project_completed);
  }
}

router.get('/', (req, res, next) => {
  Project.getAll()
    .then(projects => {
      projects.forEach(cleanProject);
      res.status(200).json(projects);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Project.create(req.body)
    .then(project => {
      cleanProject(project);
      res.status(201).json(project);
    })
    .catch(err => next(err));
});

module.exports = router;
