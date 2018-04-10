import React from 'react';
import Files from './Files.js';

let Feed = function({linkList}){
  
  let entries = linkList.map((item) => {
    return <Files file={item} />
  });

  return(
  	<div>
  	  <h2> Most Popular </h2>
  	    <ul>
          {entries}
  	    </ul>
  	</div>
  	);
}

export default Feed;