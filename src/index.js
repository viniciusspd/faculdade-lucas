import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

import AreaDoUsuario from './components/AreaDoUsuario';

import CadastroForm from './components/CadastroForm';
import ListaUsuarios from './components/ListaUsuarios';
import CalendarioAulas from './components/CalendarioAulas';
import Login from './components/Login';
import Aula from './components/Aula';

import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/aula" element={<Aula />}></Route>
      <Route path="/area-do-usuario" element={<AreaDoUsuario/>}></Route>
      <Route path="/cadastro" element={<CadastroForm />}></Route>
      <Route path="/lista-usuarios" element={<ListaUsuarios />}></Route>
      <Route path="/calendario-aulas" element={<CalendarioAulas />}></Route>
    </Routes>

    {
      // (isLogado) &&
      // <div>
      //   
      // </div>
    }

    {
      // (!isLogado) &&
      
    }
    <div>
      <Container fluid>
        <Outlet />
      </Container>
    </div>
    
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
