import { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import HttpService from "../../services/HttpService";
import HttpServiceHandler from "../../services/HttpServiceHandler";
import MenuLogado from "../MenuLogado";
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './index.css';

export default class ListaAulas extends Component {
  constructor(){
    super();

    this.state = {
      listaAulas : [],
      filtros : {
        idProfessor : null,
        statusAula : null,
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

    this.obterLista = () => {
      HttpService.listarAulas(this.state.filtros)
      .then((response) => {
        if (response) {
          console.log("response 123-> ",response);

          this.setState(prevState => ({
            ...prevState,
            listaAulas : response.data,
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
        new HttpServiceHandler().validarExceptionHTTP(error.response, this);
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

    this.handleFiltroStatusChange = (e) => {
      this.setState(prevState => ({
        ...prevState,
        filtros : {
          ...prevState.filtros,
          statusAula : e.target.value
        }
      }), () => {
        this.obterLista();
      })
    }

    this.visualizarAula = (idAula) => {
      window.location = './aula?idAula='+idAula;
    }
  }

  render(){
    return (
      <Container className="containerListaAulas">
        <MenuLogado/>
        

        <Row style={{marginBottom: "20px"}}>
          <Col sm={{span : 4}}>
            <h1>Lista de aulas.</h1>
          </Col>
          <Col sm={{span : 4, offset: 4}}>
            <FloatingLabel controlId="floatingSelectGrid" label="Filtro de status">
              <Form.Select aria-label="Floating label select example" onChange={this.handleFiltroStatusChange}>
                <option value="">Nenhum</option>
                <option value="INICIADA">Iniciada</option>
                <option value="FINALIZADA">Finalizada</option>
                {/* <option value="AGENDADA">Agendada</option> */}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        

        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Matéria</th>
                <th>Turma</th>
                <th>Professor</th>
                <th>Data Início</th>
                <th>Data Fim</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.listaAulas.map((aula) => {
                  return (
                    <tr key={aula.idAula}>
                      <td>{aula.idAula}</td>
                      <td>{aula.materia.descMateria}</td>
                      <td>{aula.turma.descTurma+ ' - '+aula.materia.tpNivelEnsino}</td>
                      <td>{aula.professor.nome}</td>
                      <td>{aula.dtHrIniciada}</td>
                      <td>{aula.dtHrFinalizada ? aula.dtHrFinalizada : '-'}</td>
                      <td>{aula.statusAula}</td>
                      <td style={{textAlign : "center"}}>
                        <Button onClick={() => {this.visualizarAula(aula.idAula)}}>Visualizar Aula</Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </Table>

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

      </Container>
    );
  }

  componentDidMount() {
    this.obterLista();
  }
}