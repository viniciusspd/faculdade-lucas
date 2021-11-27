import { Component } from "react";
import MenuLogado from "../MenuLogado";
import UsuarioLogadoService from "../../services/UsuarioLogadoService";

export default class AreaDoUsuario extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <MenuLogado/>
        <p>Olá, {UsuarioLogadoService.getNome()} </p>
      </div>
    );
  }

}