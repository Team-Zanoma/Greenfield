import React, { Component } from 'react';
// import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/App.module.scss';
import Feed from '../components/Feed.js';
import Search from './Search.js';
import NavBar from '../components/NavBar.js';
import Login from './Login.js';


/* ----------- Level 1 ----------- */

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <NavBar />
        <Login />
        <Search />
        <Feed />
      </div>
    );
  }
}

export default App;
