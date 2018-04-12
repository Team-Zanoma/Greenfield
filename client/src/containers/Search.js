import React, { Component } from 'react';
import styles from '../assets/sass/Search.module.scss';
// import Filter from './Filter.js';

/* ---------- Level 2 ----------- */

class Search extends Component {
  constructor(props) {
    super(props);
	  this.state = {}
  }

  render() {
    return (
      <div className={ styles.search_container }>
        <div className={ styles.searchInput_container }>
          <input type="text" placeholder="Tag Name" />
          <button className={`${ styles.btn } ${ styles.btn_big }`} type="button">Search</button>
        </div>
        <select>
          <option>Votes</option>
          <option>Length</option>
          <option>Tags</option>
        </select> 
      </div>
    );
  }
}

export default Search;