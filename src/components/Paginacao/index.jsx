import { Component } from "react"
import Pagination from 'react-bootstrap/Pagination'

export default class Paginacao extends Component {
    constructor(props){
        super(props)
    }

    

    render(){
        return (
            <Pagination>
                <Pagination.First onClick={() => {this.props.there.selecionarPagina(1)}} />
                <Pagination.Prev onClick={() => {this.props.there.incrementarPagina(-1)}} />
                <Pagination.Item active>{this.props.there.state.filtros.paginacaoRequest.page}</Pagination.Item>
                
                {
                (this.props.there.state.filtros.paginacaoResponse.hasProxima) &&
                <Pagination.Next onClick={() => {this.props.there.incrementarPagina(1)}} />
                }
                {
                (!this.props.there.state.filtros.paginacaoResponse.hasProxima) &&
                <Pagination.Next disabled />
                }
                <Pagination.Last onClick={() => this.props.there.selecionarPagina(this.props.there.state.filtros.paginacaoResponse.quantidade)} />
            </Pagination>
        );
    }

}