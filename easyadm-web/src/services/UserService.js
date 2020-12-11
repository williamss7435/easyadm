import Connection from "./class/Connection";

class CostCenterService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async getAll(filter = "-1"){
        let url = 'user';

        if(filter !== "-1"){
            url += `?department_id=${Number(filter)}`;
        }

        const response = await this.AsyncGet(url, true);

        if(response.success){
             response.data = response.data.map((user) => 
             (
                 {...user, nameFormated: `${user.name} / Cargo: ${user.office}`})
             );
        }

        return response;
    }

    async create(data){
        return await this.AsyncPost('user', data, true);
    }

    async update(data){
        return await this.AsyncPut('user', data, true);
    }

    async delete(id){
        return await this.AsyncDelete(`user/${id}`, null, true);
    }

}

export default new CostCenterService();
