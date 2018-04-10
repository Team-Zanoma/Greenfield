import React, { Component } from 'react';
// import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/App.module.scss';
import Feed from '../components/Feed.js';
import Search from './Search.js';
import NavBar from '../components/NavBar.js';
import Login from './Login.js';
import AddSource from './AddSource.js';


/* ----------- Level 1 ----------- */

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      showLogin: false,
      showAddSource: false
    }
    this.showLogin = this.showLogin.bind(this);
    this.showAddSource = this.showAddSource.bind(this);
  }

  showLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  showAddSource() {
    this.setState({
      showAddSource: !this.state.showAddSource
    })
  }


  render() {
    return (
      <div className={ styles.App }>
        <NavBar showLogin={this.showLogin} showAddSource={this.showAddSource} />
        {this.state.showLogin ? 
        <Login />
         : null}
        {this.state.showAddSource ?
        <AddSource />
         : null}
        <Search />
        <Feed />
      </div>
    );
  }
}

export default App;
