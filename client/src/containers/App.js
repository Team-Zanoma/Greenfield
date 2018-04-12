import React, { Component } from 'react';
import styles from '../assets/sass/App.module.scss';
import Feed from '../components/Feed.js';
import Search from './Search.js';
import NavBar from '../components/NavBar.js';
import Login from './Login.js';
import AddSource from './AddSource.js';
import axios from 'axios';


/* ----------- Level 1 ----------- */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showAddSource: false,
      linkList: [],
      username: []
    }

    this.getAllinks = this.getAllinks.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.showLogin = this.showLogin.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.showAddSource = this.showAddSource.bind(this);
    this.handleSearchByTag = this.handleSearchByTag.bind(this);
    this.handleSearchByTitle = this.handleSearchByTitle.bind(this);
    this.handleAddSource = this.handleAddSource.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  getAllinks() {
    axios.get('/api/links')
      .then((response) => {
        console.log(response.data)
        this.setState({
          linkList: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  getUsername() {
    axios.get('/api/users')
      .then((response) => {
        this.setState({
          username: response.data[0]
        });
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  handleSearchByTag(tag) {
    let tagsArray = tag.trim().split(',');

    axios.get('/api/searchByTag', {
      params: { tag: tagsArray }
    })
      .then((results) => {
        console.log(results.data);
        this.setState({
          linkList: results.data
        });
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  handleSearchByTitle(title) {
    axios.get('/api/searchByTitle', {
      params: { title: title }
    })
      .then((results) => {
        console.log(results.data);
        this.setState({
          linkList: results.data
        });
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  // handles the hiding/showing of the login popup
  showLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  // handles the hiding/showing of the add link popup
  showAddSource() {
    this.setState({
      showAddSource: !this.state.showAddSource
    });
  }

  componentDidMount() {
    this.getAllinks();
    this.getUsername();
  }


  handleLogin(username, email) {
    axios.post('/api/users', { username, email })
      .then((results) => {
        this.getUsername(username);
        console.log('success in handleLogin() axios post request');
      })
      .catch((error) => {
        console.log('error in handleLogin(), error is: ', error);
      }
    );
  }
 

  handleAddSource(tagNames, url, type) {
    let tagsArray = tagNames.trim().split(',');
    axios.post('/api/links', { tagsArray, url, type, username: 'pedrobarquinha' })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }


  handleUpVote(url) {
    axios.post('/api/upvote', { url })
      .then((response) => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error');
      }
    );
  }


  render() {
    return (
      <div className={ styles.App }>
        <NavBar showLogin={ this.showLogin } showAddSource={ this.showAddSource }/>
        { this.state.showLogin ?  <Login handleLogin={ this.handleLogin } /> : null }
<<<<<<< HEAD
        { this.state.showAddSource ? <AddSource handleAddSource={ this.handleAddSource } /> : null }
        <Search handleSearchByTag={ this.handleSearchByTag } handleSearchByTitle={ this.handleSearchByTitle }/>
=======
        { this.state.showAddSource ? <AddSource handleAddSource={ this.handleAddSource } showAddSource={ this.showAddSource } /> : null }
        <Search handleSearch={ this.handleSearch } />
>>>>>>> cleaned up add pop up
        <Feed handleUpVote={ this.handleUpVote } linkList={ this.state.linkList } />
      </div>
    );
  }
}


export default App;
