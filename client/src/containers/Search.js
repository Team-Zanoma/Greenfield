import React, { Component } from 'react';
import styles from '../assets/sass/Search.module.scss';
// import Filter from './Filter.js';

/* ---------- Level 2 ----------- */

class Search extends Component {
  constructor(props) {
    super(props);
	  this.state = {
      inputValue: '',
      searchBy: 'Tags' 
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
          <input value={ this.state.inputValue } 
            onChange={ (event) => this.handleChange(event) } 
            type="text" placeholder={this.state.searchBy} 
          />
          <button
            onClick={ () => this.state.searchBy === 'Tags' ? this.props.handleSearchByTag(this.state.inputValue) : this.props.handleSearchByTitle(this.state.inputValue) }
            className={`${ styles.btn } ${ styles.btn_big }`}
            type="button"
          >
            Search
          </button>
        </div>
        <select onChange={ (event) => this.setState({ searchBy: event.target.value }) }>
          <option>Tags</option>
          <option>Title</option>
        </select> 
      </div>
    );
  }
}

export default Search;