import axios from 'axios';

const urlBase = 'http://localhost:8080';
const urlCadastrarUsuario = 'https://ene9mo6m8wf5kma.m.pipedream.net/';  
const urlListarUsuarios = 'https://enq1m3zwev7l1yk.m.pipedream.net/';  
const defaultHeaders = {
  headers : {
    "Content-Type": "application/json",
    "Accept-Language" : "pt-br",
    "token" : "AEEAEAE"
  }
}

export default class HttpService{
  static cadastrarUsuario = (email, senha) => {
    // Exemplo de variável de configuração de headers (se precisar)
    let config = {
      // headers : {
      //   "chavedeacesso" : "123"
      //   //"chavedeacesso" : "12345",
      //   "email" : userData.email,
      //   "Content-Type": "application/json"
      // }
    };

    let data = {
      email : email,
      senha : senha
    };

    return axios.post(urlCadastrarUsuario,config,data);
  }

  static listarUsuarios = async () => {
    let request = await axios.post(urlListarUsuarios,{},{});
    return request;
  }
  static listarCalendarioAulas = async () => {
    let url = urlBase + '/calendario-aulas?size=1000';
    let request = await axios.get(url);
    return request;
  }
  static iniciarAula =  (postData) => {
    let url = urlBase + '/aulas';
    let config = {
       headers : {
         "Content-Type": "application/json"
       }
    };
    
    return axios.post(url,config,postData);
  }

  static logar = (postData) => {
    console.log("postData -> ",postData);
    return axios.post(urlBase + '/logar', postData,defaultHeaders);
  }
}