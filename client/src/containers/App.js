import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <header className={ styles.App_header }>
          <img src={logo} className={ styles.App_logo } alt="logo" />
          <h1 className={ styles.App_title }>Welcome to React</h1>
        </header>
        <p className={ styles.App_intro }>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
