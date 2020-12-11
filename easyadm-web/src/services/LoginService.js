import Connection from "./class/Connection";

class CostCenterService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async login(data){
        return await this.AsyncPost('login', data);
    }

}

export default new CostCenterService();
