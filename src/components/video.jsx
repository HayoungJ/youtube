import React, { Component } from 'react';
import styles from './video.module.css';

class Video extends Component {
  render() {
    const thumbnail = this.props.info.thumbnails.high.url;
    const title = this.props.info.title;
    const channel = this.props.info.channelTitle;

    return (
      <li className={styles.video}>
        <img className={styles.thumbnail} src={thumbnail} alt={title} />
        <span className={styles.title}>{title}</span>
        <span className={styles.channel}>{channel}</span>
      </li>
    );
  }
}

export default Video;
