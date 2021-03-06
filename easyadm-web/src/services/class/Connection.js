import axios from 'axios';

export default class Connection {

    constructor(baseURL){
        this.connection = axios.create({
            baseURL
        });
    }

    verifyToken(){
        if(!this.connection.defaults.headers.common['Authorization']){
            const token = sessionStorage.getItem('token');
            this.connection.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    async AsyncGet(url, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.get(url);
            
            // Sessão Expirada generica, não deu tempo de terminar =(
            if(response.status === 401){
                alert("Sessão expirada, para continuar faça login novamente");
                sessionStorage.clear();
                window.location.reload();
            }

            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

    async AsyncPost(url, data, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.post(url, data);
            
            // Sessão Expirada generica, não deu tempo de terminar =(
            if(response.status === 401){
                alert("Sessão expirada, para continuar faça login novamente");
                sessionStorage.clear();
                window.location.reload();
            }

            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

    async AsyncPut(url, data, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.put(url, data);
            
            // Sessão Expirada generica, não deu tempo de terminar =(
            if(response.status === 401){
                alert("Sessão expirada, para continuar faça login novamente");
                sessionStorage.clear();
                window.location.reload();
            }

            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

    async AsyncDelete(url, data, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.delete(url, data);
            
            // Sessão Expirada generica, não deu tempo de terminar =(
            if(response.status === 401){
                alert("Sessão expirada, para continuar faça login novamente");
                sessionStorage.clear();
                window.location.reload();
            }

            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

};