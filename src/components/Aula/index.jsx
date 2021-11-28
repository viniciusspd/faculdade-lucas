import { Component } from "react";
import { Container, Table, Form } from 'react-bootstrap';
import MenuLogado from "../MenuLogado";
import './index.css';
import queryString from 'query-string';
import HttpService from "../../services/HttpService";
import HttpServiceHandler from "../../services/HttpServiceHandler";
import ErroModal from "../ErroModal";
import Button from 'react-bootstrap/Button';

export default class Aula extends Component{

  constructor(props){
    super(props);

    this.state = {
      quantidadeFaltantes : 0,
      idAula : this.props.idAula ? this.props.idAula : null,
      statusAula : null,
      dtHrIniciada : null,
      dtHrFinalizada : null,
      dadosAlunos : [],
      filtros : {
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

    this.toggleFaltou = (index, flagFaltou) => {
      let dadosAlunos = this.state.dadosAlunos;
      dadosAlunos[index].presente = !flagFaltou;

      this.setState( prevState => ({
        ...prevState,
        dadosAlunos : dadosAlunos        
      }));
      //this.state.dadosAula.presencaAlunos.forEach((dadosAluno) => {})

      this.contarFaltantes();
    }

    this.contarFaltantes = () => {
      let dadosAlunos = this.state.dadosAlunos;
      let quantidadeFaltantes = 0;

      dadosAlunos.forEach((aluno) => {
        if (aluno.presente !== true && aluno.presente !== null)
          quantidadeFaltantes++;
      });

      this.setState({
        quantidadeFaltantes : quantidadeFaltantes
      });
    }

    this.salvarChamadaAtual = () => {

      HttpService.salvarChamadaAtual(this.state.idAula, this.state.dadosAlunos)
      .then((response) => {
        alert('Chamada salva com sucesso.');
      })
      .catch((error) => {
        new HttpServiceHandler().validarExceptionHTTP(error.response, this);
      });
      
    }

    this.finalizarAula = () => {
      HttpService.finalizarAula(this.state.idAula)
      .then((response) => {
        alert('Aula finalizada com sucesso.');
        if (this.props.isModal)
          this.listarChamada(this.state.idAula);
        else
          window.location = './calendario-aulas';
      })
      .catch((error) => {
        new HttpServiceHandler().validarExceptionHTTP(error.response, this);
      });
    }

    this.listarChamada = (idAula) => {
      HttpService.exibirAula(idAula)
      .then((response) => {

        console.log("response -> ",response);
        this.setState(prevState => ({
          ...prevState,
          idAula : response.data.idAula,
          statusAula : response.data.statusAula,
          dtHrIniciada : response.data.dtHrIniciada,
          dtHrFinalizada : response.data.dtHrFinalizada,
          dadosAlunos : response.data.presencaAlunos
        }));

        this.contarFaltantes();
      })
      .catch((error) => {
        new HttpServiceHandler().validarExceptionHTTP(error.response, this);
      });
    }
  }

  

  render(){
    return (
      <div>
        {
          (!this.props.isModal) &&
         <MenuLogado/>
        }
        <Container className="containerPaginaAulas">

          {
            (!this.props.isModal) &&
            <h1>Página de aulas</h1>
          }

          <p className="quantidadeFaltantes">Quantidade de faltantes: {this.state.quantidadeFaltantes}</p>
          <span>Status da aula: <strong>{this.state.statusAula}</strong></span> &nbsp; | &nbsp;
          <span>Data de início: {this.state.dtHrIniciada}</span> &nbsp; | &nbsp;
          <span>Data de finalização: {!this.state.dtHrFinalizada ? '-' : this.state.dtHrFinalizada}</span>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nome do Aluno</th>
                <th>Faltou</th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.dadosAlunos.map((dadosAluno,index) => {
                  console.log("dadosAluno",dadosAluno);
                  return (
                    <tr key={dadosAluno.aluno.idCadastro}>
                      <td style={{width: "95%"}}>{dadosAluno.aluno.nome}</td>
                      <td style={{width: "5%", textAlign:"center"}}>
                        <Form.Check 
                          type={"checkbox"}
                          id={1}
                          label={""}
                          checked={!dadosAluno.presente}
                          onChange={(e) => {this.toggleFaltou(index,e.target.checked)}}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>

          <Button onClick={this.salvarChamadaAtual}>Salvar</Button>
          <Button className="btnFinalizarAula" onClick={this.finalizarAula}>Finalizar Aula</Button>
        </Container>
          
        <ErroModal closeErroModal={this.closeErroModal} erroModal={this.state.erroModal}/>
        
      </div>
    )
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);

    if (this.props.idAula){
      this.listarChamada(this.props.idAula);
    }
    else {
      this.listarChamada(parsed.idAula);
    }

    
  }


}