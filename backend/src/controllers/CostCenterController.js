const CostCenterModel = require('../models/CostCenterModel');
const DepartmentModel = require('../models/DepartmentModel');

class CostCenterController{

    async findAll(req, res){
        const response = await CostCenterModel.findAll();
        return res.status(200).json(response);
    }

    async create(req, res){
        const {description} = req.body;
        
        if(!description || description.length < 3){
            return res.status(400).json({
                error: "A descrição deve conter no minimo 3 caracteres"
            });
        }

        const response = await CostCenterModel.create({
            description
        });
        
        return res.status(200).json(response);
    }

    async update(req, res){
        const {cost_center_id, description} = req.body;

        if(!cost_center_id){
            return res.status(400).json({
                error: "Id do centro de custo não informado"
            });
        }else if(isNaN(cost_center_id)){
            return res.status(400).json({
                error: "Id do Centro de custo deve ser um número",
            });
        }
        
        if(!description || description.length < 3){
            return res.status(400).json({
                error: "A descrição deve conter no minimo 3 caracteres"
            });
        }

        const cost_center = CostCenterModel.findByPk(cost_center_id);
        if(!cost_center){
            return res.status(400).json({
                error: "Centro de custo não encontrado",
            });
        }

        await CostCenterModel.update({
            description
        },{
            where: {id: cost_center_id}
        })

        return res.status(200).json({
            success: true,
        })
    }

    async delete(req, res){
        const {cost_center_id} = req.params;

        if(!cost_center_id){
            return res.status(400).json({
                error: "Id do centro de custo não informado"
            });
        }else if(isNaN(cost_center_id)){
            return res.status(400).json({
                error: "Id do centro de custo deve ser númerico",
            });
        }
  
        await CostCenterModel.destroy({
             where: {
                 id: cost_center_id
             }
        });

        return res.json({success: true});
    }

};


module.exports = new CostCenterController();