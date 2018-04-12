import React from 'react';
import Files from './Files.js';

import styles from '../assets/sass/Feed.module.scss';

const Feed = ({ linkList }) => {
  
  let entries = linkList.map((item, i) => <Files key={ i } file={item} />);

  return (
  	<div className={ styles.feed_container }>
  	  <h2>Most Popular</h2>
  	    <ul>
          { entries }
  	    </ul>
  	</div>
  	);
}

export default Feed;