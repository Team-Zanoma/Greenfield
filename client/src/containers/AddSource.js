import React, { Component } from 'react';
import styles from '../assets/sass/AddSource.module.scss';

/* ---------- Level 3 ---------- */

class AddSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagNames: '',
      url: '',
      type: 'Video',
      username: this.props.user
    } 
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTagNamesChange = this.handleTagNamesChange.bind(this);
  }

  
  handleUrlChange(event){
    this.setState({
      url: event.target.value
    })
  }

  handleTypeChange(event){
    this.setState({
      type: event.target.value
    })
  }

  handleTagNamesChange(event){
    this.setState({
      tagNames: event.target.value
    })
  }

  render() {
  	return (
      <div className={ styles.addSource_overlay }>
        <div className={ styles.addSource_container }>
         <button className={`${ styles.btn } ${ styles.close }`} onClick={ this.props.showAddSource }>
          <i className={ styles.btn__icon }>close</i>
         </button>
          <div className={ styles.link_container }>
            <label htmlFor="link">
              <span className={ styles.label }>Share Link</span>
              <input
                onChange={ (event) => this.handleUrlChange(event) }
                value={ this.state.url }
                type="text"
                id="link"
                placeholder="Link"
                required
              />
            </label>
            <label htmlFor="type">
              <span className={ styles.label } id="type">Link Type</span>
              <select onChange={ (event) => this.handleTypeChange(event) } defaultValue={''}>
                <option value='' disabled>Resource Type</option>
                <option value='Video'>Video</option>
                <option value='Article'>Article</option>
              </select>
            </label>
           </div> 
          <div className={ styles.suggestedTags_container }>
            <input
              onChange={ (event) => this.handleTagNamesChange(event) }
              value={ this.state.tagNames }
              type="text"
              placeholder="Tag Name"
            />
          </div>
          <div className={ styles.btnBar }>
            <button
              onClick={ () => this.props.handleAddSource(this.state.tagNames, this.state.url, this.state.type, this.state.username) }
              className={ styles.btn }
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
  	);
  }
};

export default AddSource;