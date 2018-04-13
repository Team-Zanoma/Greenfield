import React from 'react';
import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/NavBar.module.scss';

/* ----------- Level 2 ------------- */

const NavBar = ({ showLogin, showAddSource, username }) => {
	return (
		<div className={ styles.navbar_container }>
			<div className={styles.container }>
				<div className={ styles.btnBar }>
					<button className={`${ styles.btn } ${ styles.add }`} onClick={() => showAddSource()}>
						<i className={ styles.btn__icon }>add</i>
						<span className={ styles.btn__val }>Add</span>
					</button>
					<button className={ styles.btn } onClick={() => showLogin()}>
						<i className={ styles.btn__icon }>account_box</i>
						<span className={ styles.btn__val }> { username !== 'anonymous' ? username : 'Login'}</span>
					</button>
				</div>
				<div className={ styles.logo }>
					<img src={ logo } alt="logo" />
					<span className={ styles.name }>Devterest</span>
				</div>
			</div>
		</div>
	); 
};

export default NavBar;