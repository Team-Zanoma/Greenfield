import React from 'react';

/* ------------ Level 3 ------------ */


let Files = function({file}){

  return(
  	<li>
  	  <div>
  	    <h3><a href={file.url}>{file.title}</a></h3>
  	    <span>{file.description}</span>
  	    <br/>
  	    <br/>
  	    <span> Likes:{file.likes} </span>
  	    <span> Shares:{file.shares}</span>
  	  </div>
    </li>
  );
}


export default Files;