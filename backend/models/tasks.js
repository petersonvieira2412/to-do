'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {}
  }

  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
        defaultValue: 'To Do',
      },
      order: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );

  return Task;
};