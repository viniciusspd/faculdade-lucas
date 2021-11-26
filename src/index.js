import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Outlet } from 'react-router';

import Menu from './components/Menu';
import { Container } from 'react-bootstrap';
import CadastroForm from './components/CadastroForm';
import ListaUsuarios from './components/ListaUsuarios';
import CalendarioAulas from './components/CalendarioAulas';



import reportWebVitals from './reportWebVitals';


import {BrowserRouter,Routes,Route} from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/cadastro" element={<CadastroForm />}></Route>
      <Route path="/lista-usuarios" element={<ListaUsuarios />}></Route>
      <Route path="/calendario-aulas" element={<CalendarioAulas />}></Route>
    </Routes>

    <div>
      <Menu/>
    </div>
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
