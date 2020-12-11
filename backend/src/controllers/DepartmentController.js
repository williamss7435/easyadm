const DepartmentModel = require('../models/DepartmentModel');
const CostCenterModel = require('../models/CostCenterModel');
const UserModel = require('../models/UserModel');

class DepartmentController{

    async findAll(req, res){
        const {cost_center_id} = req.query;
        const where = {}
        
        if(cost_center_id){
            where.cost_center_id = cost_center_id;
        }

        const response = await DepartmentModel.findAll({where});
        return res.status(200).json(response);

    }

    async create(req, res){
        const {name, cost_center_id} = req.body;
        
        if(!name || name.length < 3){
            return res.status(400).json({
                error: "O nome do departamento deve conter no minimo 3 caracteres"
            });
        }

        if(!cost_center_id){
            return res.status(400).json({
                error: "Centro de custo não informado",
            });
        }else if(isNaN(cost_center_id)){
            return res.status(400).json({
                error: "Id do Centro de custo deve ser um número",
            });
        }

        const cost_center = await CostCenterModel.findByPk(cost_center_id);

        if(!cost_center){
            return res.status(400).json({
                error: "Centro de custo não encontrado",
            });
        }

        const department = await DepartmentModel.create({
            name, cost_center_id
        });

        return res.status(200).json(department);

    }

    async update(req, res){
        const {department_id, name, cost_center_id} = req.body;

        if(!department_id){
            return res.status(400).json({
                error: "Id do departamento não informado"
            });
        }else if(isNaN(department_id)){
            return res.status(400).json({
                error: "O id departamento deve ser um número",
            });
        }

        if(name && name.length < 3){
            return res.status(400).json({
                error: "O nome do departamento deve conter no minimo 3 caracteres"
            });
        }

        if(cost_center_id){
            const cost_center = await CostCenterModel.findByPk(cost_center_id);

            if(!cost_center){
                return res.status(400).json({
                    error: "Centro de custo não encontrado",
                });
            }
        }

        const department = await DepartmentModel.findByPk(department_id);
        if(!department){
            return res.status(400).json({
                error: "departamento não encontrado"
            });
        }

        await DepartmentModel.update({
            department_id, name, cost_center_id},
            {
                where: {
                    id: department_id,
                }
            }
        );

        res.status(200).json({
            success: true,
        });
    }

    async delete(req, res){
        const {department_id} = req.params;

        if(!department_id){
            return res.status(400).json({
                error: "Id do departamento não informado"
            });
        }else if(isNaN(department_id)){
            return res.status(400).json({
                error: "Id do departamento deve ser númerico",
            });
        }

        await DepartmentModel.destroy({
            where: {
                id: department_id
            }
        });

        return res.json({success: true});
    }

};


module.exports = new DepartmentController();