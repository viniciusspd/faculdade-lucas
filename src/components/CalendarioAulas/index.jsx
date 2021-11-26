import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import HttpService from '../../services/HttpService';

export default class ListaUsuarios extends Component {

  constructor(props){
    super(props);

    this.state = {
      calendarioAulas : []
    };
  }

  render(){    
    return (      
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th>Dia Semana</th>
          <th>Inicio</th>
          <th>Fim</th>
          <th>Materia</th>
          <th>Ensino</th>
          <th>Professor</th>
          <th>Turma</th>    
          </tr>
        </thead>
        <tbody>
          {
            this.state.calendarioAulas.map((aula) => {
              return(
                <tr key={aula.idCalendarioAula}>
                  <td>{aula.diaSemana}</td>
                  <td>{aula.hrInicio}</td>
                  <td>{aula.hrFim}</td>
                  <td>{aula.descMateria}</td>
                  <td>{aula.tpNivelEnsino}</td>
                  <td>{aula.nomeProfessor}</td>
                  <td>{aula.descTurma}</td>
                </tr>
              )
            })
          }          
        </tbody>
      </Table>      
    );
  }

  componentDidMount(){
    HttpService.listarCalendarioAulas()
    .then((response) => {
      console.log("response -> ",response);
      if (response){
        this.setState({
          calendarioAulas : response.data
        });
      }
    })
    .catch((error) => {
      console.log("error -> ",error);
    })
  }
}