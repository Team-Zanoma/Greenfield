import React, { Component } from 'react';
import styles from '../assets/sass/App.module.scss'; 
import Feed from '../components/Feed.js';
import Search from './Search.js';
import NavBar from '../components/NavBar.js';
import Login from './Login.js';
import AddSource from './AddSource.js';
import Dashboard from '../components/Dashboard.js'
import axios from 'axios';

/* ----------- Level 1 ----------- */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false, // Boolean to show/hide 'Login'
      showAddSource: false, // show/hide 'AddSource'
      showDashboard: false, // show/hide 'Dashboard'
      linkList: [], // Contains all links sent back from server
      favoritesList: [], // all favorites sent back from server
      username: [], // holds single username value
      currentUser: 'anonymous', // Username is initially anonymous before logging in
      isLoggedIn: false, 
      searchTitle: 'Most Popular' //Sources initially render by most popular
    }



    this.getAllinks = this.getAllinks.bind(this);
    this.showLogin = this.showLogin.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.showAddSource = this.showAddSource.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
    this.hideDashboard = this.hideDashboard.bind(this);
    this.deleteFavorites = this.deleteFavorites.bind(this);
    this.filterLinks = this.filterLinks.bind(this);

    this.handleSearchByTag = this.handleSearchByTag.bind(this);
    this.handleSearchByTitle = this.handleSearchByTitle.bind(this);
     
    this.handleAddSource = this.handleAddSource.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.handleFeedTitleChange = this.handleFeedTitleChange.bind(this);
    this.sortLinksBy = this.sortLinksBy.bind(this);
  }

  /*
    WARNING: Do not change format GET/POST Requests
    - Changing the way paramaters are sent up will throw off queries to db
  */
  
  // Triggers tagsController .getTags function...
  // returns all sources that match search bar value
  getAllinks() {
    axios.get('/api/links')
      .then((response) => {
        this.setState({
          linkList: response.data
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
        var links = {};
        var linksArr = [];
        results.data.forEach((link) => {
          if (!links[link.url]) {
            links[link.url] = link;
            linksArr.push(link);            
          }
        })

        this.setState({
          linkList: linksArr
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
  }

  hideDashboard() {
    this.getUserFavorites();

    this.setState({
      showDashboard: !this.state.showDashboard
    })
  }

  //Filter links so sources do not repeat
  filterLinks(results) {
    var links = {};
    var linksArr = [];
    results.data.forEach((link) => {
      if (!links[link[0].url]) {
        links[link[0].url] = link;
        linksArr.push(link);            
      }
    })

    this.setState({
      favoritesList: linksArr
    })
  }
  
  getUserFavorites() {
    // sending up username, to get favorites for each individual user
    axios.get('/api/userLinks', {params: {username: this.state.currentUser}})
    .then((results) => {
      this.filterLinks(results);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  showDashboard() {
    this.setState({
      showDashboard: !this.state.showDashboard
    })
    this.getUserFavorites();
  }

  deleteFavorites(linkId) {
    // When star is clicked, send up linkID and user to delete from db
    axios.post('/api/deleteFav', { linkId, username: this.state.currentUser })
    .then((results) => {
      this.getUserFavorites();
    })
    .catch((error) => {
      console.log(error);
    })
  }


  handleLogin(username, email) {
    axios.post('/api/users', { username, email })
      .then((results) => {
        // this.getUsername(username);
        this.setState({
          currentUser: username,
          showLogin: !this.state.showLogin,
          isLoggedIn: !this.state.isLoggedIn,
        })
      })
      .catch((error) => {
        console.log('error in handleLogin(), error is: ', error);
      }
    );
  }
 

  handleAddSource(tags, url, kind) {
    //convert from react-tags-input format into a simple array format
    let tagArr = tags.map((tag) => tag.id);
    let infoObj = { tagName: tagArr, url, kind, username: this.state.currentUser }

    axios.post('/api/links', infoObj )
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
    axios.post('/api/userLinks', {username: this.state.currentUser, url})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  
    axios.post('/api/upVote', { url })
      .then((response) => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error');
      }
    );
  }

  handleDownVote(url) {
    axios.post('/api/downVote', { url })
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

  /*
  Components that may confuse you:
  1.) Search - Search bar on main page, contains filters for search criteria
  2.) Dashboard - This component pops up when the user clicks the 'Favorites' button
                  Can Delete favroites from this component
  3.) AddSource - This component pops up when you click the 'Add' button. 
                  Gives you the ability to paste links in, choose link type, and add tag
                  Holds ReactTags Component - holds prebuilt functionality for drag and drop, auto complete, and suggestions
  
  Other components should be self-explanatory while viewing the page: https://hrnyc14-devterest.herokuapp.com/
  - Hit us up if you have any questions... happy to help
  */



  render() {
    return (
      <div className={ styles.App }>
        <NavBar
          showDashboard={ this.showDashboard }
          isLoggedIn={ this.state.isLoggedIn }
          username={ this.state.currentUser }
          showLogin={ this.showLogin }
          showAddSource={ this.showAddSource }
        />
        <Search
          sort={ this.sortLinksBy }
          handleFeedTitleChange={ this.handleFeedTitleChange }
          handleSearchByTag={ this.handleSearchByTag }
          handleSearchByTitle={ this.handleSearchByTitle }
        />
        { this.state.showDashboard
          ? (<Dashboard
              deleteFavorites={ this.deleteFavorites }
              favoritesList={ this.state.favoritesList }
              hideDashboard={ this.hideDashboard }
            />)
          : (null)
        }
        { this.state.showLogin
          ? (<Login
              handleLogin={ this.handleLogin }
              showLogin={ this.showLogin }
            />)
          : (null)
        }
        { this.state.showAddSource
          ? (<AddSource
              handleAddSource={ this.handleAddSource }
              showAddSource={ this.showAddSource }
              user={ this.state.username.username }
            />)
          : (null)
        }
        <Feed
          title={ this.state.searchTitle }
          handleUpVote={ this.handleUpVote }
          handleDownVote={ this.handleDownVote }
          linkList={ this.state.linkList }
        />
      </div>
    );
  }
}


export default App;
