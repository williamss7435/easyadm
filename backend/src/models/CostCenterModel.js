const {DataTypes, Model} = require('sequelize');

class CostCenter extends Model {
   static init (sequelize){
       super.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       }, {sequelize, tableName: 'cost_center'});

       return this;
   }
}

module.exports = CostCenter;