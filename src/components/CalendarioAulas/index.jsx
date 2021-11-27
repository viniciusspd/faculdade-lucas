import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination'
import HttpService from '../../services/HttpService';
import userLogado from '../../dto/UsuarioLogadoDto';
import ErroModal from '../ErroModal';
import HttpServiceHandler from '../../services/HttpServiceHandler';
import Form from 'react-bootstrap/Form';


import './index.css';

export default class CalendarioAulas extends Component {

  constructor(props){
    super(props);

    this.state = {
      calendarioAulas : [],
      filtros : {
        idProfessor : null,
        diaSemana : false,
        paginacaoRequest : {
          size: 15,
          page: 1
        },
        paginacaoResponse : {
          quantidade : null,
          hasProxima : null
        }
      },
      erroModal : {
        mensagemErro : '',
        show : false,
        titulo : ''
      },      
    };

    this.closeErroModal = () => {
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
      e.preventDefault(); // Cancela a ação padrão do submit    

      HttpService.cadastrarUsuario(this.state.email, this.state.senha)
      .then((response) => {
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

    this.obterLista = () => {
      HttpService.listarCalendarioAulas(this.state.filtros)
      .then((response) => {
        if (response){
          this.setState(prevState => ({
            ...prevState,
            calendarioAulas : response.data,
            filtros : {
              ...prevState.filtros,
              paginacaoResponse : {
                quantidade : parseInt(response.headers['page-quantidade']),
                hasProxima : response.headers['page-has-proxima'] === 'true' ? true : false
              }
            }
          }));
        }
      })
      .catch((error) => {
        let httpServiceHandler = new HttpServiceHandler();
        httpServiceHandler.validarExceptionHTTP(error.response,this);
      })
    }

    this.selecionarPagina = (numeroPagina) => {
      this.setState(prevState => ({
        ...prevState,
        filtros : {
          ...prevState.filtros,
          paginacaoRequest : {
            ...prevState.filtros.paginacaoRequest,
            page : numeroPagina
          }
        }
      }), () => {
        this.obterLista();
      });
    }

    this.incrementarPagina = (incremento) => {
      let incrementoPagina = this.state.filtros.paginacaoRequest.page + incremento;

      if (incrementoPagina > 0)
        this.selecionarPagina(incrementoPagina);
    }

    this.toggleExibirAulasDoDia = (e) => {
      if (e.target.checked){
        this.setState(prevState => ({
          filtros : {
            ...prevState.filtros,
            diaSemana : true
          }
        }), () => {
          this.obterLista();
        });
        
      }
      else {
        this.setState(prevState => ({
          filtros : {
            ...prevState.filtros,
            diaSemana : false
          }
        }), () => {
          this.obterLista();
        });
        
      }


    }
  }


  

  render(){
    return (   
      <Container className="containerCalendarioAulas" sm={{span : 8, offset : 2}}>

        <h3 className="tituloModulo">Calendário de aulas</h3>


        <Form.Check 
          type={"checkbox"}
          id={1}
          label={"Exibir somente aulas de hoje"}
          checked={this.state.filtros.diaSemana}
          onChange={this.toggleExibirAulasDoDia}
        />

        {
          <span>{this.state.filtros.diaSemana}</span>
        }

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
                  </tr>
                )
              })
            }          
          </tbody>
        </Table>

        {
          (this.state.filtros.paginacaoResponse.hasProxima)
          
        }

        
        <Pagination>
          <Pagination.First onClick={() => {this.selecionarPagina(1)}} />
          <Pagination.Prev onClick={() => {this.incrementarPagina(-1)}} />
          <Pagination.Item active>{this.state.filtros.paginacaoRequest.page}</Pagination.Item>
          
          {
            (this.state.filtros.paginacaoResponse.hasProxima) &&
            <Pagination.Next onClick={() => {this.incrementarPagina(1)}} />
          }
          {
            (!this.state.filtros.paginacaoResponse.hasProxima) &&
            <Pagination.Next disabled />
          }
          <Pagination.Last onClick={() => this.selecionarPagina(this.state.filtros.paginacaoResponse.quantidade)} />
        </Pagination>
        
        
        {
          (this.state.mensagemErro !== '') &&
          <ErroModal closeErroModal={this.closeErroModal} erroModal={this.state.erroModal}/>
        }
      
      </Container>
      
    );
  }

  componentDidMount(){
    this.obterLista();
  }
}