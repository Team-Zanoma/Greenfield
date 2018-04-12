import React from 'react';
import styles from '../assets/sass/Files.module.scss';

/* ------------ Level 3 ------------ */


const Files = ({ file, handleUpVote }) => {

  return (
  	<li className={ styles.file_container }>
      <img src={ file.image } alt="" />
  	  <div className={ styles.details }>
  	    <h3>
          <a href={ file.url }>{ file.title }</a>
        </h3>
  	    <div>{ file.description }</div>
  	    <div className={ styles.metrics }>
          <ul>
            <li>
              <span className="title"><i className={ styles.share__icon } onClick={() => handleUpVote(file.url)}>star</i>Likes</span>
              <span className="count">{ file.likes }</span>
            </li>
            <li>
              <span className="title"><i className={ styles.share__icon }>share</i>Shares</span>
              <span className="count">{ file.shares }</span>
            </li>
          </ul>
        </div>
  	  </div>
    </li>
  );
}


export default Files;