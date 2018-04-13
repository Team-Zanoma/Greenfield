import React, { Component } from 'react';
import styles from '../assets/sass/AddSource.module.scss';
import '../assets/sass/style.css';

import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';

/* ---------- Level 3 ---------- */

class AddSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tagNames: '',
      url: '',
      type: 'Video',
      username: this.props.user,
      inputValue: '',   //input value for react-tag-input
      tags: 
        [   //'current' tags for react-tag-input

        ],
      suggestions: 
        [   //suggested tags for react-tag-input
            {id: 'asdf', text: 'asdf'}
        ]
    } 

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTagNamesChange = this.handleTagNamesChange.bind(this);

    //React-Tags-Input Pre-built Methods
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  componentDidMount() {
    this.getTags();
  }

  getTags() {
    
    axios.get('/api/getAllTags')
    .then((results) => {
      console.log('getTags() is returning results: ', results);

      let tags = results.data.map((tag) => { 
        return {
          id:String(tag.id_tags), 
          text:tag.tagName}
      });
      this.setState({
        suggestions: tags
      })
    })
    .catch((error) => {
      console.log('error in getTags()');
    })
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

  //Pre-Built Methods for React-Tags-Input
  handleDelete(i) {
    console.log('deleted index: ', i)
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }
  
  handleAddition(tag) {
    let { tags } = this.state;
    console.log('handleAddition() tag is', tag)
    this.setState({ tags: [...tags, { id: tag.id, text: tag.text }] });
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    // re-render
    this.setState({ tags });
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
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

           <ReactTags
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              handleTagClick={this.handleTagClick}
            />
          <div className={ styles.suggestedTags_container }>

          </div>
          <div className={ styles.btnBar }>
            <button
              onClick={ () => this.props.handleAddSource(this.state.tags, this.state.url, this.state.type, this.state.username) }
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

//Previous Tag Input Form before React-Tag-Input was implemented
/*
  <input
    onChange={ (event) => this.handleTagNamesChange(event) }
    value={ this.state.tagNames }
    type="text"
    placeholder="Tag Name"
  />
*/