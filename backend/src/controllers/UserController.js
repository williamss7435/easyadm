const UserModel = require('../models/UserModel');
const DepartmentModel = require('../models/DepartmentModel');
const User = require('../models/UserModel');

class UserController{

    async findAll(req, res){
        const {department_id} = req.query;
        const where = {}
        
        if(department_id){
            where.department_id = department_id;
        }

        const response = await UserModel.findAll({
            where
        });

        return res.status(200).json(response);
    }

    async create(req, res){
        const {name, office, department_id} = req.body;

        if(!name || name.length < 3){
            return res.status(400).json({
                error: "O nome do usuário deve conter no minimo 3 caracteres"
            });
        }

        if(!office || office.length < 3){
            return res.status(400).json({
                error: "O cargo do usuário deve conter no minimo 3 caracteres"
            });
        }

        if(!department_id){
            return res.status(400).json({
                error: "departamento não informado",
            });
        }else if(isNaN(department_id)){
            return res.status(400).json({
                error: "O id do departamento deve ser um número",
            });
        }

        const department = await DepartmentModel.findByPk(department_id);
       
        if(!department){
            return res.status(400).json({
                error: "Departamento não encontrado",
            });
        }

        const user = await UserModel.create({
            name, office, department_id
        });


        return res.status(200).json(user);
    }

    async update(req, res){
        const {user_id, name, office, department_id} = req.body;
        
        if(!user_id){
            return res.status(400).json({
                error: "Id do usuário não informado"
            });
        }else if(isNaN(user_id)){
            return res.status(400).json({
                error: "O id usuário deve ser um número",
            });
        }

        if(name && name.length < 3){
            return res.status(400).json({
                error: "O nome do usuário deve conter no minimo 3 caracteres"
            });
        }

        if(office && office.length < 3){
            return res.status(400).json({
                error: "O cargo do usuário deve conter no minimo 3 caracteres"
            });
        }

        if(department_id){
            const department = await DepartmentModel.findByPk(department_id);

            if(!department){
                return res.status(400).json({
                    error: "Departamento não encontrado",
                });
            }
        }
        
        const user = await UserModel.findByPk(user_id);
        if(!user){
            return res.status(400).json({
                error: "usuário não encontrado"
            });
        }

        await UserModel.update({
            name, office, department_id
        }, {
            where: {
                id: user_id
            }
        });
        
        res.status(200).json({
            success: true,
        });
    }

    async delete(req, res){
        const {user_id} = req.params;

        if(!user_id){
            return res.status(400).json({
                error: "Id do usuário não informado"
            });
        }else if(isNaN(user_id)){
            return res.status(400).json({
                error: "Id do usuário deve númerico",
            });
        }

        await UserModel.destroy({
            where: {
                id: user_id
            }
        });

        return res.json({success: true});
    }

};


module.exports = new UserController();