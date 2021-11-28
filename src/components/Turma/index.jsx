import { Component } from "react";
import { Container, Table, Form, Row, Col } from 'react-bootstrap';
import './index.css';
import queryString from 'query-string';
import HttpService from '../../services/HttpService';
import HttpServiceHandler from '../../services/HttpServiceHandler';
import ErroModal from '../ErroModal';
import Button from 'react-bootstrap/Button';
import MenuLogado from '../MenuLogado';
import { Modal } from 'react-bootstrap';
import DateHelper from '../../helpers/DateHelper';


export default class Turma extends Component{

  constructor(props){
    super(props);

    this.state = {
      idTurma : 0,
      descTurma  : '',
      tpPeriodo : '',
      tpNivelEnsino : '',
      totalFaltas : 0,
      alunosTurma : [],
      erroModal : {
        mensagemErro : '',
        show : false,
        titulo : ''
      },
      sucessoModal : {
        mensagem : '',
        show : false,
        redirect : ''
      }, 
      faltasAlunoModal : {
        idAluno : 0,
        detalhesAluno: null,
        show : false,
      }     
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

    this.closeSucessoModal = () => {
      if (this.state.sucessoModal.redirect) {
        window.location = this.state.sucessoModal.redirect;
      }

      this.setState({
        sucessoModal : {
          mensagem : '',
          show : false
        }
      });
    }

    this.abrirSucessoModal = (msg,redirect) => {
      this.setState({
        sucessoModal : {
          mensagem : msg,
          show : true,
          redirect : redirect
        }
      });
    }

    this.abrirFaltasAlunoModal = (idAluno) => {
        HttpService.exibirAluno(idAluno)
        .then((response) => {
            console.log(response);
          this.setState({
            faltasAlunoModal : {
                idAluno : idAluno,
                show : true,
                detalhesAluno : response.data
            }
          });
  
        })
        .catch((error) => {
          new HttpServiceHandler().validarExceptionHTTP(error.response, this);
        });
    }

    this.fecharFaltasAlunoModal = () => {
        this.setState({
            faltasAlunoModal : {
                idAluno : 0,
                show : false,
            }
          });
    }

    this.exibirTurma = (idTurma) => {
      HttpService.exibirTurma(idTurma)
      .then((response) => {

        let data = response.data;
        this.setState(prevState => ({
          ...prevState,
          idTurma : idTurma,
          descTurma  : data.descTurma,
          tpPeriodo : data.tpPeriodo,
          tpNivelEnsino : data.tpNivelEnsino,
          totalFaltas : data.totalFaltas,
          alunosTurma : data.alunos
        }));

      })
      .catch((error) => {
        new HttpServiceHandler().validarExceptionHTTP(error.response, this);
      });
    }
  }

  

  render(){
    return (
      <div>

        <Container className="containerListaAlunosTurma">
            <MenuLogado/>

            <Form> 
            <Row className="mb-3">
                <Form.Group as={Col} controlId="turmaForm.descTurma">
                    <Form.Label>Turma</Form.Label>
                    <Form.Control type="text" placeholder={this.state.descTurma} disabled  />
                </Form.Group>
            
                <Form.Group as={Col} controlId="turmaForm.tpPeriodo">
                    <Form.Label>Ensino</Form.Label>
                    <Form.Control type="text" placeholder={this.state.tpPeriodo} disabled  />
                </Form.Group>

                <Form.Group as={Col} controlId="turmaForm.tpNivelEnsino">
                    <Form.Label>Período</Form.Label>
                    <Form.Control type="text" placeholder={this.state.tpNivelEnsino} disabled  />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="turmaForm.totalFaltas">
                <Form.Label>Total de faltas na turma</Form.Label>
                <Form.Control type="text" placeholder={this.state.totalFaltas} disabled  />
            </Form.Group>
            </Form>
            

            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>nome</th>
                    <th>número de Matricula</th>
                    <th>número do RA</th>
                    <th>Ação</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {
                    this.state.alunosTurma.map((aluno) => {
                    return (
                        
                        <tr key={aluno.idAluno}>
                        <td>{aluno.nome}</td>
                        <td>{aluno.descTurma}</td>
                        <td>{aluno.nroMatricula}</td>
                        <td>{aluno.ra}</td>
                        <td style={{textAlign : "center"}}>
                            {/* <Button onClick={() => {this.visualizarAula(aula.idAula)}}>Visualizar Aula</Button> */}
                            <Button onClick={() => {this.abrirFaltasAlunoModal(aluno.idAluno)}}>Calcular total de faltas</Button>
                        </td>
                        </tr>
                    )
                    })
                }
                </tbody>

            </Table>

            <Modal show={this.state.sucessoModal.show} onHide={this.closeSucessoModal}>
            <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.sucessoModal.mensagem}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.closeSucessoModal}>
                Ok
                </Button>
            </Modal.Footer>
            </Modal>

            <Modal show={this.state.faltasAlunoModal.show} onHide={this.fecharFaltasAlunoModal}>
            <Modal.Header closeButton>
            <Modal.Title>Total de faltas</Modal.Title>
            </Modal.Header>
            {this.state.faltasAlunoModal.detalhesAluno &&
            <Modal.Body>
                <h5>Data da consulta: {DateHelper.dateParaFormatoPtBr(new Date())}</h5>
                <br/>
                <h5>Informações do aluno:</h5>
                <br/>
                <p>Total de faltas: </p>
                <p>Nome: {this.state.faltasAlunoModal.detalhesAluno.nome} </p>
                <p>CPF: {this.state.faltasAlunoModal.detalhesAluno.cpf} </p>
                <p>Data de Nascimento: {this.state.faltasAlunoModal.detalhesAluno.dtNascimento}</p>
                <p>Sexo: {this.state.faltasAlunoModal.detalhesAluno.sexo}</p>
                <p>Número de Matricula: {this.state.faltasAlunoModal.detalhesAluno.nroMatricula}</p>
                <p>Número de RA: {this.state.faltasAlunoModal.detalhesAluno.ra}</p>
                <p>Email: {this.state.faltasAlunoModal.detalhesAluno.emailContato}</p>
            </Modal.Body>
            }
            <Modal.Footer>
                <Button variant="secondary" onClick={this.fecharFaltasAlunoModal}>
                Ok
                </Button>
            </Modal.Footer>
            </Modal>
            
            <ErroModal closeErroModal={this.closeErroModal} erroModal={this.state.erroModal}/>
            </Container>
      </div>
    )
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);

      
    this.exibirTurma(parsed.idTurma);
    
  }


}