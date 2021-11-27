import { Component } from "react";


// Usando sessionStorage aqui após pesquisar sobre a melhor maneira de utilizar sessão com o React.
export default class UsuarioLogadoService extends Component {

  static setDadosUsuarioLogado = (obj, emailLogin) => {
    window.sessionStorage.setItem('tokenAcesso',obj.tokenAcesso);
    window.sessionStorage.setItem('idCadastro',obj.idCadastro);
    window.sessionStorage.setItem('nome',obj.nome);
    window.sessionStorage.setItem('emailLogin',emailLogin);
  }

  static logoff = () => {
    window.sessionStorage.clear();
  }

  static getTokenAcesso = () => {
    return window.sessionStorage.getItem('tokenAcesso');
  }

  static getEmailLogin = () => {
    return window.sessionStorage.getItem('emailLogin');
  }

  static getIdCadastro = () => {
    return window.sessionStorage.getItem('idCadastro');
  }

  static getNome = () => {
    return window.sessionStorage.getItem('nome');
  }
}