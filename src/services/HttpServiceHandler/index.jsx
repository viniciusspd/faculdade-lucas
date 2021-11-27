import { Component } from "react";

export default class HttpServiceHandler  extends Component {

  static validarExceptionHTTP = (response) => {

    if (response.status == 401){
      alert(response.data.mensagemErro);
      window.location = '/login';
    }

  }

}
