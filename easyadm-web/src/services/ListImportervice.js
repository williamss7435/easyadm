import Connection from "./class/Connection";

class CostCenterService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }
 
    async create(data){
        return await this.AsyncPost('import-list', data, true);
    }

}

export default new CostCenterService();
