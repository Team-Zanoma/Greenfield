import React from 'react';
import styles from '../assets/sass/AddSource.module.scss';
import styles2 from '../assets/sass/Feed.module.scss';

const Dashboard = function() {
	return(
      <div className={ styles.dashboard_overlay }>
        <h2> Favorites </h2>
        <div className={ styles2.dashboard_container }>


        </div>
      </div>
	);
}

export default Dashboard;