import React, { Component }  from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailLogin : '',
      senha : '',
    }

  }  

  render(){
    return (
      <div>
        <h1>Login</h1>
      </div>
    );
  }

}