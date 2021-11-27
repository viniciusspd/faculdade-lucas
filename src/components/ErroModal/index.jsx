import { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
export default class ErroModal extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      show : true,
    }

    this.handleClose = () => { 
      this.setState({ show : false })
    };

    this.handleShow = () => { 
      this.setState({ show : true })
    };
    
  } 

  render() {
    return (
      <Modal show={true} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deu erro.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}