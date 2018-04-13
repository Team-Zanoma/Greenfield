import React from 'react';
import styles from '../assets/sass/Files.module.scss';

/* ------------ Level 3 ------------ */

class Files extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      voted: false
    }
  }

  handleVoteState() {
    this.setState({
      voted: !this.state.voted
    })
  }

  render() {
    const { file, handleUpVote, handleDownVote } = this.props;
    return (
      <li className={ styles.file_container }>
        <img src = { file.url } src={ file.image } alt="" />
        <div className={ styles.details }>
          <h3>
            <a href={ file.url }>{ file.title }</a>
          </h3>
          <div>{ file.description }</div>
          <div className={ styles.metrics }>
            <ul>
              <li>
                <span className="title"><i className={ styles.share__icon } onClick={ () => { 
                  !this.state.voted ? handleUpVote(file.url) : handleDownVote(file.url);
                  this.handleVoteState();  
                }
                }>{ this.state.voted ? 'star_border' : 'star' }</i>Votes</span>
                <span className="count">{ this.state.voted ? file.votes + 1 : file.votes }</span>
              </li>
              <li>
                <span className="title"><i className={ styles.share__icon }>share</i>Shares</span>
                <span className="count">{ file.shares }</span>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

export default Files;