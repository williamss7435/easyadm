import Connection from "./class/Connection";

class CostCenterService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async getAll(filter = "-1"){
        let url = 'department';

        if(filter !== "-1"){
            url += `?cost_center_id=${Number(filter)}`;
        }

        return await this.AsyncGet(url, true);
    }

    async create(data){
        return await this.AsyncPost('department', data, true);
    }

    async update(data){
        return await this.AsyncPut('department', data, true);
    }

    async delete(id){
        return await this.AsyncDelete(`department/${id}`, null, true);
    }

}

export default new CostCenterService();
