
const db = require('../../data/dbConfig');

const getAll = async () => {
  const tasks = await db('tasks');
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskProject = await db('projects').where({ project_id: task.project_id }).first();
    task.project_name = taskProject.project_name;
    task.project_description = taskProject.project_description;
    console.log(tasks);
  }
  return Promise.resolve(tasks);
}

const getById = (task_id) => {
  return db('tasks').where({ task_id }).first();
}

const create = async (task) => {
  const [task_id] = await db('tasks').insert(task);
  return getById(task_id);
}

module.exports = {
  getAll,
  getById,
  create
}
