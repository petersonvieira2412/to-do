const express = require('express');
const TasksController = require('../controllers/tasksController');
const router = express.Router();

router.route('/tasks')
  .get(TasksController.getAllTasks)
  .post(TasksController.createTask);

router.put('/tasks/reorder', TasksController.reorderTasks);

router.route('/tasks/:id')
  .put(TasksController.updateTask)
  .get(TasksController.getTaskById)
  .delete(TasksController.deleteTask);

module.exports = router;
