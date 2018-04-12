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
      username: [],
      searchTitle: 'Most Popular'
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
    this.handleFeedTitleChange = this.handleFeedTitleChange.bind(this);
    this.sortLinksBy = this.sortLinksBy.bind(this);
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
    if (tag === '') {
      this.getAllinks();
      return;
    }
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
    if (title === '') {
      this.getAllinks();
      return;
    }

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
 

  handleAddSource(tagNames, url, kind, username) {
    let tagsArray = tagNames.replace(/, /g, ',').split(',');
    axios.post('/api/links', { tagName: tagsArray, url, kind, username })
      .then((data) => {
        this.getAllinks();
        return this.showAddSource();
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

  handleFeedTitleChange(title) {
    this.setState({
      searchTitle: title
    })
  }

  sortLinksBy(criteria) {
    const links = this.state.linkList;
    const crit = criteria;

    const sorted = links.sort((linkA, linkB) => {
      if (linkA[crit] < linkB[crit]) {
        return 1;
      } 
      if (linkA[crit] > linkB[crit]) {
        return -1;
      }
      return 0;
    });

    this.setState({
      linkList: sorted
    });
  }

  render() {

    return (
      <div className={ styles.App }>
        <NavBar showLogin={ this.showLogin } showAddSource={ this.showAddSource }/>
        { this.state.showLogin ?  <Login handleLogin={ this.handleLogin } /> : null }
        { this.state.showAddSource
          ? (<AddSource
              handleAddSource={ this.handleAddSource }
              showAddSource={ this.showAddSource }
              user={ this.state.username.username }
            />)
          : (null)
        }
        <Search sort={ this.sortLinksBy } handleFeedTitleChange={ this.handleFeedTitleChange } handleSearchByTag={ this.handleSearchByTag } handleSearchByTitle={ this.handleSearchByTitle }/>
        <Feed title={ this.state.searchTitle } handleUpVote={ this.handleUpVote } linkList={ this.state.linkList } />
      </div>
    );
  }
}


export default App;
