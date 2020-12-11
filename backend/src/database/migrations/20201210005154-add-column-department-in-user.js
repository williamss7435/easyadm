'use strict';
const {DataTypes} = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('user', 'department_id', {
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          key: 'id',
          model: {
            tableName: 'department',
          },
        }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user', 'department_id');;
  }
};
