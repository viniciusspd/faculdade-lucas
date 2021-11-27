import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import HttpService from '../../services/HttpService';
import userLogado from '../../dto/UsuarioLogadoDto';
import ErroModal from '../ErroModal';
import HttpServiceHandler from '../../services/HttpServiceHandler';

export default class CalendarioAulas extends Component {

  constructor(props){
    super(props);

    console.log("this.props -. ",this.props);

    this.state = {
      calendarioAulas : [],
      filtros : {
        idProfessor : null,
        paginacao : {
          size: 30,
          page: 1
        }
      },
      erroModal : {
        mensagemErro : '',
        show : false,
        titulo : ''
      },      
    };

    this.closeErroModal = () => {
      console.log("fechando a modal.");
      this.setState({
        erroModal : {
          mensagemErro : '',
          showModalErro : false,
          titulo : ''
        }
      });
    }
   

    this.definirFiltroInicial = () => {
      if (userLogado.getTipoCadastro() === 'PROFESSOR')
        this.state.filtros.idProfessor = userLogado.getIdCadastro();
    }

    this.enviarDados = (e) => {
      console.log("state -> ",this.state);
      e.preventDefault(); // Cancela a ação padrão do submit    

      HttpService.cadastrarUsuario(this.state.email, this.state.senha)
      .then((response) => {
        console.log("response -> ",response);

        if (response.data.sucesso){
          alert(response.data.mensagem)
        }
        else {
          alert("Por algum motivo o usuário não foi cadastrado. Por favor, tente mais tarde.");
        }
        
      })
      .catch((error) => {
        console.log("error -> ",error.response)
        // Desenvolve a lógica do erro aqui
      });

      return true;
    }

    this.definirFiltroInicial();

    this.abrirModal = () => {
      console.log("abrir modal");
      
    }
  }


  

  render(){
    return (   
      <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th>Dia Semana</th>
          <th>Turma</th>  
          <th>Ensino</th>
          <th>Inicio</th>
          <th>Fim</th>
          <th>Materia</th>
          <th>Professor</th>  
          </tr>
        </thead>
        <tbody>
          {
            this.state.calendarioAulas.map((aula) => {
              return(
                <tr key={aula.idCalendarioAula}>
                  <td>{aula.diaSemana}</td>
                  <td>{aula.descTurma}</td>
                  <td>{aula.tpNivelEnsino}</td>
                  <td>{aula.hrInicio}</td>
                  <td>{aula.hrFim}</td>
                  <td>{aula.descMateria}</td>
                  <td>{aula.nomeProfessor}</td>
                  <td><button onClick={this.abrirModal}>BUTÃO</button></td>
                </tr>
              )
            })
          }          
        </tbody>
      </Table>
      {
        (this.state.mensagemErro !== '') &&
        <ErroModal closeErroModal={this.closeErroModal} erroModal={this.state.erroModal}/>
      }
      
      </div>
      
    );
  }

  componentDidMount(){
    HttpService.listarCalendarioAulas(this.state.filtros)
    .then((response) => {
      console.log("response -> ",response);
      if (response){
        this.setState({
          calendarioAulas : response.data
        });
      }
    })
    .catch((error) => {
      console.log("DEU PAU");
      // console.log("error -> ",error.response);

      // this.setState( prevState => ({
      //   erroModal : {
      //     ...prevState.erroModal,
      //     mensagemErro : error.response.data.mensagemErro,
      //     show : true,
      //     titulo : 'Erro '+error.response.status
      //   }
      // }));

      let httpServiceHandler = new HttpServiceHandler();
      httpServiceHandler.validarExceptionHTTP(error.response,this);
    })
  }
}