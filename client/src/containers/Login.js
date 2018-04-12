import React, { Component } from 'react';

/* ----------- Level 3 ----------- */

class Login extends Component {
  constructor(props) {
    super(props);
	  this.state = {
      username: '',
      email: ''
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleUserChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  render() {
  	return (
  	  <div className="login_container">
        <form onSubmit={(event) => {event.preventDefault(); this.props.handleLogin(this.state.username, this.state.email)}}>
          <input value={this.state.value} onChange={(event) => {this.handleUserChange(event)}} type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <input value={this.state.email} onChange={(event) => {this.handleEmailChange(event)}} type="email" placeholder="email" required />
          <input type="submit" value="Login" />
        </form>
  	  </div>
  	)
  }
}

export default Login;