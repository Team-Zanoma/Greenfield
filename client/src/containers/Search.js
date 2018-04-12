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
            type="text" placeholder={ this.state.searchBy } 
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
        <select onChange={ (event) => this.setState({ searchBy: event.target.value }) }>
          <option>Tags</option>
          <option>Title</option>
        </select> 
        <div style={{float:'right', position:"relative", right:"20px"}}>
        <form onChange={ (event) => this.props.sort(event.target.value) }>
          <h5> sort by: </h5>
          <div style={{display:"block"}}>
            <input type="radio" id="sorting1"
             name="sorting" value="votes" />
            <label for="contactChoice1"> Votes </label>
          </div>
          <input type="radio" id="sorting2"
           name="sorting" value="shares" />
          <label for="contactChoice2"> Share </label>
          
          <input type="radio" id="sorting2"
           name="sorting" value="addedAt" />
          <label for="contactChoice2"> Date </label>
        </form>
        </div>
      </div>
    );
  }
}

export default Search;