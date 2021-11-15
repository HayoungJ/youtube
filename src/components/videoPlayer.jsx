import React, { Component } from 'react';
import styles from './videoPlayer.module.css';

class VideoPlayer extends Component {
  state = {
    isDescOpened: false,
  };

  handleClick = () => {
    this.setState({ isDescOpened: !this.state.isDescOpened });
  };

  render() {
    const { id, title, description, channelTitle } = this.props.info;
    return (
      <div className={styles.video}>
        <div className={styles['player-wrapper']}>
          <iframe
            className={styles.player}
            src={`http://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={title}
          ></iframe>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.channel}>{channelTitle}</span>
          <div className={styles['description-wrap']}>
            <span
              className={`${styles.description} ${
                this.state.isDescOpened
                  ? styles['full-description']
                  : styles['short-description']
              }`}
            >
              {description.split('\n').map((line, index) => {
                return (
                  <span key={Date.now() + index}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </span>
            <span
              className={styles['more-description-btn']}
              onClick={this.handleClick}
            >
              {this.state.isDescOpened ? '간략히' : '더보기'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
