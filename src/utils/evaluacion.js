

import React, {Component} from 'react';
import axios from 'axios';
//const API_BASE_URL = "http://localhost:8000/api"
const API_BASE_URL = "https://teztiapi.laravel.cloud/api"
const client_id  ="e452c70e88d804d2396b06a78f3da0ce"
const client_secret= "953a5b98beb97a7d130093cf6a7d93dc"
class EvaluacionService extends Component{
    constructor(){
        super();
        this.state = {
            users: []
        };
    }
     // Método para establecer el token de autenticación
     setAuthToken(token) {
        this.state.authToken = token;
    }
    
    // Método para obtener las cabeceras con el token actual
    getHeaders() {
        const headers = {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        };
        
        // Agregar el token de autorización si existe
        if (this.state.authToken) {
            headers["Authorization"] = `Bearer ${this.state.authToken}`;
        }
        
        return headers;
    }
    createevaluado(evaluado){
        evaluado.client_id=client_id;
        evaluado.client_secret=client_secret;
        return axios.post(API_BASE_URL+'/ins', evaluado,{
            headers: {'Content-Type': 'application/json'}
        })}
    getevaluado(token,userid,position_id){
        //return axios.get("/api/evaluacion?access_token="+token);
          
        const headers = {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
          };
         return fetch( API_BASE_URL+'/evaluado/sel?id='+userid+"&pos="+position_id,{headers } )
    }
   
     
}

export default new EvaluacionService()