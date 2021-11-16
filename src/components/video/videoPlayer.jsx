import React, { PureComponent } from 'react';
import styles from './videoPlayer.module.css';
import { getHtmlString } from '../../utils/index.js';

class VideoPlayer extends PureComponent {
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
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={title}
          ></iframe>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{getHtmlString(title)}</span>
          <span className={styles.channel}>{getHtmlString(channelTitle)}</span>
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
                  <span key={index}>
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
