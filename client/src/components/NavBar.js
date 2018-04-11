import React from 'react';

/* ----------- Level 2 ------------- */

const NavBar = ({showLogin, showAddSource}) => {
	return (
      <div className='navbar_container'>
        <p>Devterest</p>
        <button onClick={() => showLogin()}>Login</button>
        <button onClick={() => showAddSource()}>Add</button>
      </div>
	); 
};

export default NavBar;