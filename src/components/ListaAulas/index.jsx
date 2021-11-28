import { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import HttpService from "../../services/HttpService";
import HttpServiceHandler from "../../services/HttpServiceHandler";
import MenuLogado from "../MenuLogado";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListaPresencaModal from "../ListaPresencaModal";
import ErroModal from "../ErroModal";

import './index.css';
import Paginacao from "../Paginacao";

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
      detalheAulaModal : {
        idAula : 0,
        show : false,
      }
    };

    this.obterLista = () => {
      HttpService.listarAulas(this.state.filtros)
      .then((response) => {
        if (response) {

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

    this.abrirDetalhesAula = (idAula) => {
      this.setState( prevState => ({
        ...prevState,
        detalheAulaModal : {
          ...prevState.detalheAulaModal,
          show : true,
          idAula : idAula
        }
      }));

      console.log("detalheAulaModal -> ",this.state);
    }

    this.closeErroModal = () => {
      this.setState({
        erroModal : {
          mensagemErro : '',
          showModalErro : false,
          titulo : ''
        }
      });
    }

    this.closeDetalheAulaModal = () => {
      this.setState({
        detalheAulaModal : {
          idAula : 0,
          show : false,
        }
      });
      this.obterLista();
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
                        {/* <Button onClick={() => {this.visualizarAula(aula.idAula)}}>Visualizar Aula</Button> */}
                        <Button onClick={() => {this.abrirDetalhesAula(aula.idAula)}}>Visualizar Aula</Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </Table>

          <Paginacao there={this}/>

          <ListaPresencaModal closeDetalheAulaModal={this.closeDetalheAulaModal} detalheAulaModal={this.state.detalheAulaModal} />
          <ErroModal closeErroModal={this.closeErroModal} erroModal={this.state.erroModal}/>

      </Container>
    );
  }

  componentDidMount() {
    this.obterLista();
  }
}