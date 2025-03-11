const TasksService = require('../services/tasksService');

class TasksController {
    async getAllTasks(req, res) {
        try {
            const tasks = await TasksService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks', error });
        }
    }

    async getTaskById(req, res) {
        try {
            const task = await TasksService.getTaskById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task', error });
        }
    }

    async createTask(req, res) {
        try {
            const newTask = await TasksService.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error: error.message || error });
        }
    }

    async updateTask(req, res) {
        try {
            
            const updateTask = await TasksService.updateTask(req.params.id, req.body);
            if (!updateTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(updateTask);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error });
        }
    }

    async deleteTask(req, res) {
        try {
            let deletedTask
            if (!Array.isArray(req.body)) {
                deletedTask = await TasksService.deleteTask(req.params.id);
            }
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error });
        }
    }

    async reorderTasks(req, res) {
        try {
            let reorderTasks
            if (!Array.isArray(req.body)) {
                reorderTasks = await TasksService.reorderTasks(req.body);
            }
            res.status(200).json(reorderTasks);
        } catch (error) {
            res.status(500).json({ message: 'Error reorder tasks', error });
        }
    }
}

module.exports = new TasksController();