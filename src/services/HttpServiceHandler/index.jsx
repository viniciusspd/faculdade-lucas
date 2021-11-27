import { Component } from "react";
import ErroDto from "../../dto/ErroDto";

export default class HttpServiceHandler  extends Component {

  constructor() {
    super();
    this.validarExceptionHTTP = (response, origemErro) => {

      origemErro.setState( prevState => ({
        erroModal : {
          ...prevState.erroModal,
          mensagemErro : response.data.mensagemErro,
          show : true,
          titulo : 'Erro '+response.status
        }
      }));
  
      if (response.status == 401){
        ErroDto.setErroToken(response.data.mensagemErro);
        window.location = '/login';
      }
  
    }
  }
}
