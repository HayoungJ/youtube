import React, { Component } from 'react';
import styles from './videoInfo.module.css';

class VideoInfo extends Component {
  render() {
    return (
      <div className={styles.video}>
        <div className={styles[`player-wrapper`]}>
          <iframe
            className={styles.player}
            src={`http://www.youtube.com/embed/${this.props.id}`}
            frameBorder="0"
            title={this.props.info.title}
          ></iframe>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{this.props.info.title}</span>
          <span className={styles.channel}>{this.props.info.channelTitle}</span>
          <div className={styles[`description-wrap`]}>
            <span className={styles.description}>
              {this.props.info.description.split('\n').map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
            </span>
            <span className={styles[`more-description`]}>더보기</span>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoInfo;
