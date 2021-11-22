import axios from 'axios';

const urlCadastrarUsuario = 'https://ene9mo6m8wf5kma.m.pipedream.net/';  
const urlListarUsuarios = 'https://enq1m3zwev7l1yk.m.pipedream.net/';  

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
}