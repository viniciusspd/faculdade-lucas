import { Component } from "react";
import MenuLogado from "../MenuLogado";
import UsuarioLogadoDto from "../../dto/UsuarioLogadoDto";
import CalendarioAulas from "../CalendarioAulas";

export default class AreaDoUsuario extends Component {

  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        <MenuLogado/>
        <p>Olá, {UsuarioLogadoDto.getNome()} </p>

        <CalendarioAulas/>
      </div>
    );
  }

}