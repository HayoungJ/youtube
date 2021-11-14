import React, { Component } from 'react';
import styles from './video.module.css';

class Video extends Component {
  handleClick = () => {
    this.props.onSelect(this.props.id);
  };

  render() {
    const thumbnail = this.props.info.thumbnails.high.url;
    const title = this.props.info.title;
    const channel = this.props.info.channelTitle;

    return (
      <li className={styles.video} onClick={this.handleClick}>
        <img className={styles.thumbnail} src={thumbnail} alt={title} />
        <span className={styles.title}>{title}</span>
        <span className={styles.channel}>{channel}</span>
      </li>
    );
  }
}

export default Video;
