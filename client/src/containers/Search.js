import React, { Component } from 'react';
import styles from '../assets/sass/Search.module.scss';
// import Filter from './Filter.js';

/* ---------- Level 2 ----------- */

class Search extends Component {
  constructor(props) {
    super(props);
	  this.state = {
      inputValue: '' 
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    return (
      <div className={ styles.search_container }>
        <div className={ styles.searchInput_container }>
          <input value={this.state.inputValue} onChange={(event) => this.handleChange(event)} type="text" placeholder="Tag Name" />
          <button
            onClick={ () => this.props.handleSearch(this.state.inputValue) }
            className={`${ styles.btn } ${ styles.btn_big }`}
            type="button"
          >
            Search
          </button>
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