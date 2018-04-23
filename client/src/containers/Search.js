import React, { Component } from 'react';
import styles from '../assets/sass/Search.module.scss';

// import Filter from './Filter.js';

/* ---------- Level 2 ----------- */

class Search extends Component {
  constructor(props) {
    super(props);
	  this.state = {
      inputValue: '',
      searchBy: `Tags`
    }

    this.handleChange = this.handleChange.bind(this);
  }

  // Change state of input value as user types
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  /*
    Main parts of render():
    1.) Drop down to filter search by (tags or title)
    2.) Input field to search for source
    3.) Button to submit search request
    4.) Radio buttons to filer sources by certain criteria
  */

  render() {
    return (
      <div className={ styles.search_container }>
        <div className={ styles.searchInput_container }>
          <div className={ styles.select }>
            <select onChange={ (event) => this.setState({ searchBy: event.target.value }) } defaultValue={''}>
              <option value='' disabled>Search By...</option>
              <option>Tags</option>
              <option>Title</option>
            </select> 
          </div>
          <input value={ this.state.inputValue } 
            onChange={ (event) => this.handleChange(event) } 
            type="text" placeholder=""
          />
          <button
            onClick={ () => {
              this.state.searchBy === 'Tags' ? this.props.handleSearchByTag(this.state.inputValue) : this.props.handleSearchByTitle(this.state.inputValue)
              if (this.state.inputValue !== '') this.props.handleFeedTitleChange('search results for: ' + this.state.inputValue)
              else this.props.handleFeedTitleChange('Most Popular')
            }}
            className={`${ styles.btn } ${ styles.btn_big }`}
            type="button"
          >
            Search
          </button>
        </div>
        <div className={ styles.sortRadios }>
          <form onChange={ (event) => this.props.sort(event.target.value) }>
            <h4>Sort by:</h4>
            <span>
              <input type="radio" id="sorting1" name="sorting" value="votes" defaultChecked={ true } />
              <label htmlFor="sorting1">Votes</label>
            </span>
            <span>
              <input type="radio" id="sorting2" name="sorting" value="shares" />
              <label htmlFor="sorting2">Shares</label>
            </span>
            <span>
              <input type="radio" id="sorting3" name="sorting" value="addedAt" />
            <label htmlFor="sorting3">Date</label>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;