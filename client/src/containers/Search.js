import React, { Component } from 'react';
// import Filter from './Filter.js';

/* ---------- Level 2 ----------- */

class Search extends Component{
  constructor(props) {
    super(props);
	  this.state = {}
  }

  render() {
    return (
      <div className='search_container'>
        <div className='searchInput_container'>
          <input type='text' placeholder='Tag Name' />
          <button type='button'>Search</button>
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