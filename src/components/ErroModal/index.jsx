import { Component } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
export default class ErroModal extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      show : false,
    }

    this.handleClose = () => { 
      this.setState({ show : false })
    };

    this.handleShow = () => { 
      console.log('ali');
      this.setState({ show : true })
    };
    
  } 

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
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