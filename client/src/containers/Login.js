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
  
  // Change state of username input as user types
  handleUserChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  // Change state of email input
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }
  
  // Called when user clicks 'Login' button
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
            <label htmlFor="Username">
              <span className={ styles.label }>Username</span>
              <input
                value={ this.state.value }
                onChange={ (event) => this.handleUserChange(event) }
                type="text"
                placeholder="Username"
                id="Username"
                required
              />
            </label>
            <label htmlFor="Password">
              <span className={ styles.label }>Password</span>
              <input
                type="password"
                placeholder="Password"
                id="Password"
                required
              />
            </label>
            <label htmlFor="Email">
              <span className={ styles.label }>Email</span>
              <input
                value={ this.state.email }
                onChange={ (event) => this.handleEmailChange(event) }
                type="email"
                placeholder="Email"
                id="Email"
                required
              />
            </label>
            <div className={ styles.btnBar }>
              <input
                type="submit"
                value="Login"
                className={ styles.btn }
              />
            </div>
          </form>
        </div>
      </div>
  	)
  }
}

export default Login;