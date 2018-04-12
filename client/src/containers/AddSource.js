import React, { Component } from 'react';
import styles from '../assets/sass/AddSource.module.scss';

/* ---------- Level 3 ---------- */

class AddSource extends Component {
  constructor(props) {
    super(props);
    this.state = {} 
  }

  render() {
  	return (
      <div className={ styles.addSource_overlay }>
        <div className={ styles.addSource_container }>
          <div className={ styles.link_container }>
            <label htmlFor="link">
              <span className={ styles.label }>Share Link</span>
              <input type="text" id="link" placeholder="Link" />
            </label>
            <label htmlFor="type">
              <span className={ styles.label } id="type">Link Type</span>
              <select>
                <option>Video</option>
                <option>Article</option>
              </select>
            </label>
           </div> 
          <div className={ styles.suggestedTags_container }>
            <input type="text" placeholder="Tag Name" />
          </div>
          <div className={ styles.btnBar }>
            <button className={ styles.btn } type="submit">Submit</button>
          </div>
        </div>
      </div>
  	);
  }
};

export default AddSource;