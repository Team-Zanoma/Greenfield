import React, { Component } from 'react';
import styles from '../assets/sass/AddSource.module.scss';

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
    this.loginSubmit = this.loginSubmit.bind(this);
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

  loginSubmit(event) {
    event.preventDefault();
    this.props.handleLogin(this.state.username, this.state.email);
  }

  render() {
  	return (
      <div className={ styles.addSource_overlay }>
        <div className={ styles.addSource_container }>
          <button className={`${ styles.btn } ${ styles.close }`} onClick={ this.props.showLogin }>
            <i className={ styles.btn__icon }>close</i>
          </button>
          <form onSubmit={ (event) => this.loginSubmit(event) } >
            <input value={this.state.value} onChange={(event) => {this.handleUserChange(event)}} type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <input value={this.state.email} onChange={(event) => {this.handleEmailChange(event)}} type="email" placeholder="email" required />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
  	)
  }
}

export default Login;