import Connection from "./class/Connection";

class CostCenterService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async getAll(){
        return await this.AsyncGet('cost-center', true);
    }

    async create(data){
        return await this.AsyncPost('cost-center', data, true);
    }

    async update(data){
        return await this.AsyncPut('cost-center', data, true);
    }

    async delete(id){
        return await this.AsyncDelete(`cost-center/${id}`, null, true);
    }

}

export default new CostCenterService();
