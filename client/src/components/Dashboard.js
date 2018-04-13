import React from 'react';
import styles from '../assets/sass/AddSource.module.scss';
import styles2 from '../assets/sass/Feed.module.scss';
import styles3 from '../assets/sass/Files.module.scss';

/* -------- Level 2 --------- */

const Dashboard = function({ hideDashboard, favoritesList, deleteFavorites }) {
	return(
      <div className={ styles.dashboard_overlay }>
        <div className={ styles.addSource_container }>
          <button className={`${ styles.btn } ${ styles.close2 }`}>
            <i className={ styles.btn__icon } onClick={() => hideDashboard() }>close</i>
          </button>
          <h2> Favorites </h2>
          <div className={ styles2.feed_container }>
            <ul>
            {favoritesList.map((file) => {
              return(
                <li className={ styles3.file_container }>
                 <img src={ file[0].image } alt="" />
                  <div className={ styles3.details }>
                    <h3>
                     <a href={ file[0].url } target='_blank'>{ file[0].title }</a>
                   </h3>
                    <div>{ file[0].description }</div>
                    <div className={ styles3.metrics }>
                     <ul>
                       <li>
                         <span className="title"><i className={ styles3.share__icon } onClick={ () => deleteFavorites(file[0].id_links) }>star_border</i>Liked</span>
                         <span className="count">{ file[0].likes }</span>
                       </li>
                       <li>
                         <span className="title"><i className={ styles3.share__icon }>share</i>Shares</span>
                         <span className="count">{ file[0].shares }</span>
                       </li>
                     </ul>
                   </div>
                  </div>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </div>
	);
}

export default Dashboard;