import React, { Component } from 'react';

/* ---------- Level 3 ---------- */

class AddSource extends Component {
  constructor(props) {
    super(props);
    this.state = {} 
  }

  render() {
  	return (
      <div className='addSource_container'>
        <div className='link_container'>
          <input type='text' placeholder='Link' />
          <select>
            <option> Video </option>
            <option> Article </option>
          </select>
         </div> 
        <div className='suggestedTags_container'>
          <input type='text' placeholder='Tag Name' />
        </div>
      </div>
  	);
  }
};

export default AddSource;