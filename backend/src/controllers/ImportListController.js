const UserModel = require('../models/UserModel');
const DepartmentModel = require('../models/DepartmentModel');
const User = require('../models/UserModel');

class UserController{

    async create(req, res){
        const {list} = req.body;

        if(!list){
            return res.status(400).json({
                error: "lista não informada"
            });
        }

        const response = await UserModel.bulkCreate(list);

        return res.status(200).json(response);
    }

};


module.exports = new UserController();