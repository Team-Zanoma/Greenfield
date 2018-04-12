import React from 'react';
import Files from './Files.js';

import styles from '../assets/sass/Feed.module.scss';

const Feed = ({ linkList, handleUpVote }) => {
<<<<<<< HEAD
  
  let entries = linkList.map((item, i) => <Files handleUpVote={handleUpVote} key={ i } file={item} />);
  
=======
  
  let entries = linkList.map((item, i) => <Files handleUpVote={handleUpVote} key={ i } file={item} />);

>>>>>>> 12371714571aece88a44792d64f7dd30243d0223
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