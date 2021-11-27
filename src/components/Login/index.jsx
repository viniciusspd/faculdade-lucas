import React, { Component }  from 'react';

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import HttpService from '../../services/HttpService';
import HttpServiceHandler from '../../services/HttpServiceHandler';



import './index.css';
import UsuarioLogadoService from '../../services/UsuarioLogadoService';
import MenuNaoLogado from '../MenuNaoLogado';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailLogin : '',
      senha : '',
      mensagemErro : '',
    }

    this.handleEmaiLogin = (e) => {
      this.setState({
        emailLogin : e.target.value
      });
    }

    this.handleSenha = (e) => {
      this.setState({
        senha : e.target.value
      });
    }

    this.realizarLogin = (e) => {
      e.preventDefault();
      console.log("vou fazer o login.");

      HttpService.logar({
        emailLogin : this.state.emailLogin,
        senha : this.state.senha
      }).then((response) => {
        UsuarioLogadoService.setDadosUsuarioLogado(response.data, this.state.emailLogin);        
        window.location = '/area-do-usuario'
        
      })
      .catch((error) => {
        console.log("error -> ",error.response);
        let mensagemErro = ''; 
        if (error.response.status == 422){          
          error.response.data.forEach((erro) => {
            mensagemErro += erro.campo + " - " + erro.mensagemErro + ";";
          })
        }
        else {
          mensagemErro = error.response.data.mensagemErro;
        }
        this.setState({
          mensagemErro : mensagemErro
        })
      });
    }

  }  

  render(){
    return (
      <Container fluid>
        <MenuNaoLogado/>
        <Row>
          <Col sm={{span : 4, offset: 4}}>
            <Form id="formLogin" className="ps-5 pe-5 pt-5 pb-5">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email de acesso</Form.Label>
                <Form.Control type="email" placeholder="exemplo@outlook.com" onChange={this.handleEmaiLogin} value={this.state.emailLogin} required autoComplete="false" />
                <Form.Text className="text-muted">
                  Nós nunca iremos compartilhar seu e-mail com outras pessoas.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Senha" value={this.state.senha} onChange={this.handleSenha} />
              </Form.Group>
              {
                (this.state.mensagemErro !== '') &&
                <Alert variant={"danger"}>
                  {this.state.mensagemErro}
                </Alert>
              }
              <Button variant="primary" onClick={this.realizarLogin} type="submit">
                Entrar
              </Button>
            </Form>
          </Col>
        </Row>

        

      </Container>
    );
  }

}