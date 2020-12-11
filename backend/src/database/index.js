const {Sequelize} = require('sequelize');
const confDatabase = require('../config/database');

const User = require('../models/UserModel');
const CostCenter = require('../models/CostCenterModel');
const DepartmentModel = require('../models/DepartmentModel');

class Database {

    constructor(){
        this.connection = new Sequelize(confDatabase);
        this.initModels();
    } 

    initModels(){
        User.init(this.connection);
        CostCenter.init(this.connection);
        DepartmentModel.init(this.connection);
    }

}

module.exports = new Database();