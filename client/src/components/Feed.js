import React from 'react';
import Files from './Files.js';

import styles from '../assets/sass/Feed.module.scss';

const Feed = ({ linkList, handleUpVote, title }) => {
  let entries = linkList.map((item, i) => <Files handleUpVote={handleUpVote} key={ i } file={item} />);

  return (
  	<div className={ styles.feed_container }>
  	  <h2> { title } </h2>
  	    <ul>
          { entries }
  	    </ul>
  	</div>
  	);
}

export default Feed;