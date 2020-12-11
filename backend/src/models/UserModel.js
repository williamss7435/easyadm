const {DataTypes, Model} = require('sequelize');


class User extends Model {
   static init (sequelize){
       super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
           name: {
               type: DataTypes.STRING,
                allowNull: false,
           },
           office: {
            type: DataTypes.STRING,
             allowNull: false,
           },
           department_id: {
            type: DataTypes.INTEGER,
           },
       }, {sequelize, tableName: 'user'});

       return this;
   }
}

module.exports = User;