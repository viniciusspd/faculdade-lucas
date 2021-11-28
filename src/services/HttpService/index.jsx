import axios from 'axios';
import UsuarioLogadoDto from '../../dto/UsuarioLogadoDto';

const urlBase = 'http://localhost:8080';
const urlCadastrarUsuario = 'https://ene9mo6m8wf5kma.m.pipedream.net/';  
const urlListarUsuarios = 'https://enq1m3zwev7l1yk.m.pipedream.net/';  
const defaultHeaders = {
  headers : {
    "Content-Type": "application/json",
    "Accept-Language" : "pt-br",
    "token" : UsuarioLogadoDto.getTokenAcesso() ? UsuarioLogadoDto.getTokenAcesso() : ""
  }
}
const defaultConfig = {
  headers : defaultHeaders.headers 
}


export default class HttpService{

  static queryPaginacao = (paginacao) => {
    return (!paginacao.size || !paginacao.page) ? '' : 'size=' + paginacao.size + '&page=' + (paginacao.page - 1); 
  } 

  static gerarParams = (arrParams) => {
    return (arrParams.length > 0) ? '?'+arrParams.join('&'):'';
  }
  
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

  static exibirAula = async (idAula) => {
    let url = urlBase + '/aulas/'+idAula;

    let response = await axios.get(url,defaultConfig);
    return response;

  }

  static listarUsuarios = async () => {
    let request = await axios.post(urlListarUsuarios,{},{});
    return request;
  }
  
  static listarCalendarioAulas = async (filtros) => {
    let url = urlBase + '/calendario-aulas';
    let queryParams = [];

    if (filtros.diaSemana){
      const d = new Date();
      const weekday = ["DOMINGO", "SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO"];
      let day = weekday[d.getDay()];
      queryParams.push('diaSemana=' + day);
      
    }

    if (filtros.idProfessor) {
      queryParams.push('idProfessor=' + filtros.idProfessor);
    }
    if (filtros.paginacaoRequest) {
      queryParams.push(HttpService.queryPaginacao(filtros.paginacaoRequest));
    }

    url += HttpService.gerarParams(queryParams);

    let request = await axios.get(url,defaultConfig);
    return request;
  }
  static iniciarAula =  (postData) => {
    let url = urlBase + '/aulas';
    let config = defaultConfig;
    
    return axios.post(url,postData,config);
  }

  static salvarChamadaAtual = (idAula, listaChamada) => {

    let json = [];

    listaChamada.forEach((dadosAluno) => {
      json.push({
        idAluno : dadosAluno.aluno.idCadastro,
        isPresente : dadosAluno.presente === null ? true : dadosAluno.presente
      });
    })

    let url = urlBase + '/aulas/'+idAula+"/presencas";
    let config = defaultConfig;
    
    return axios.put(url,json,config);
  }

  static finalizarAula = (idAula) => {
    let url = urlBase + '/aulas/'+idAula+"/finalizar";
    let config = defaultConfig;
    return axios.put(url,{},config);
  }

  static logar = (postData) => {
    return axios.post(urlBase + '/logar', postData,defaultHeaders);
  }
}