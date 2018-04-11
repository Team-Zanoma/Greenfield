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
    this.state = {
      showLogin: false,
      showAddSource: false,
      linkList: []
    }
    this.showLogin = this.showLogin.bind(this);
    this.showAddSource = this.showAddSource.bind(this);
  }

// render initial sources to Feed
  componentDidMount() {
    this.setState({
      linkList: sampleList
    });
  }

  showLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  showAddSource() {
    this.setState({
      showAddSource: !this.state.showAddSource
    });
  }


  render() {
    return (
      <div className={ styles.App }>
        <NavBar showLogin={ this.showLogin } showAddSource={ this.showAddSource } />
        { this.state.showLogin ?  <Login /> : null }
        { this.state.showAddSource ? <AddSource /> : null }
        <Search />
        <Feed linkList={ this.state.linkList } />
      </div>
    );
  }
}

let sampleList = [
 {title: 'Intro to Javascript', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png',  url: '', likes: 1234, shares: 55, description: 'Javascript expert John Doe walks you through how to make a simple javascript application from start to finish. Learn concepts such as functions, for loops, while loops, implicit type coercion, objects, and more'},
 {title: 'Cracking the Coding Challenges', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 1004, shares: 85, description: 'Coding challenges got you in a jam?  Try out these simple problems that will have you cracking these challenges in no time'},
 {title: 'Reactions to React', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 434, shares: 12, description: 'Now one of the most popular front-end frameworks in startups and large companies alike, React has many quirks and easter eggs that many developers have not used yet'},
 {title: 'Intro to Javascript', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 134, shares: 55, description: 'Javascript expert John Doe walks you through how to make a simple javascript application from start to finish. Learn concepts such as functions, for loops, while loops, implicit type coercion, objects, and more'},
 {title: 'Intro to Javascript', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 1234, shares: 55, description: 'Javascript expert John Doe walks you through how to make a simple javascript application from start to finish. Learn concepts such as functions, for loops, while loops, implicit type coercion, objects, and more'},
 {title: 'Cracking the Coding Challenges', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 1004, shares: 85, description: 'Coding challenges got you in a jam?  Try out these simple problems that will have you cracking these challenges in no time'},
 {title: 'Reactions to React', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 434, shares: 12, description: 'Now one of the most popular front-end frameworks in startups and large companies alike, React has many quirks and easter eggs that many developers have not used yet'},
 {title: 'Intro to Javascript', img: 'https://its.unl.edu/images/services/icons/Canvas%20Icon-F-01-01.png', url: '', likes: 134, shares: 55, description: 'Javascript expert John Doe walks you through how to make a simple javascript application from start to finish. Learn concepts such as functions, for loops, while loops, implicit type coercion, objects, and more'}
]

export default App;
