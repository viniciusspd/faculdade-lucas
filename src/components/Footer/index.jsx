import React  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import imgComputador from '../../assets/images/computador_branco.png';

const Footer = () => {

    return (
        <Row>
        <Col sm={12} className="footer paddingContainer text-center">
          <img src={imgComputador} />
          <p id="copyright">&copy; Copyright BLR - 2021</p>            
        </Col>          

      </Row>
    ) 
}

export default Footer;