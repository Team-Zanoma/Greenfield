import React from 'react';

/* ----------- Level 3 ----------- */

class Login extends React.Component{

  constructor(props){
    super(props);
	  this.state = {
		
	  }
  }

  render(){
  	return(
  	  <div className='login_container'>
        <form>
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
          <input type='button' value='Login' />
        </form>
  	  </div>
  	)
  }
}

export default Login;