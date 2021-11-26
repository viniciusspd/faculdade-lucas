import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <Navbar fixed="top" bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Trabalho da Faculdade</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Lista de funcionalidades</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to={"/"}>Telinha inicial</Link>
                <Link to={"/cadastro"}>Cadastro de usuário</Link>
                <Link to={"/lista-usuarios"}>Lista de usuários</Link>
                <Link to={"/calendario-aulas"}>Calendário de Aulas</Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}