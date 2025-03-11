const db = require('../../models/index');
const Task = db.Task
const { sequelize } = db;

class TasksService {
    async getAllTasks() {
        return await Task.findAll({
            order: [['order', 'ASC']]
        });
    }

    async getTaskById(id) {
        return await Task.findByPk(id);
    }

    async createTask(taskData) {
        return await Task.create(taskData);
    }

    async updateTask(id, data) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        return await task.update(data);
    }

    async deleteTask(id) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        return await task.destroy();
    }

    async reorderTasks(reorderTasks) {
        const transaction = await sequelize.transaction();
        try {
            const results = await Promise.all(
                reorderTasks.map(async (updatedTask) => {
                    const task = await Task.findByPk(updatedTask.id, { transaction });
                    if (!task) throw new Error(`Task ${updatedTask.id} não encontrada`);
                    
                    return task.update({ order: updatedTask.order, status: updatedTask.status || task.status
                    }, { transaction });
                })
            );
            
            await transaction.commit();
            return results;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Reorder failed: ${error.message}`);
        }
    }
}

module.exports = new TasksService();