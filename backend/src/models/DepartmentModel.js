const {DataTypes, Model} = require('sequelize');

class DepartmentModel extends Model {
   static init (sequelize){
       super.init({
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
          },
          cost_center_id: {
            type: DataTypes.INTEGER,
          }
       }, 
       {sequelize, tableName: 'department'}
       );

       return this;
   }
}

module.exports = DepartmentModel;