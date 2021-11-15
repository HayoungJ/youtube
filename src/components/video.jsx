import React, { Component } from 'react';
import styles from './video.module.css';

class Video extends Component {
  handleClick = () => {
    this.props.onSelect(this.props.id);
  };

  render() {
    const { title, thumbnail, channelTitle } = this.props.info;
    return (
      <li className={styles['video-wrap']}>
        <div className={styles.video} onClick={this.handleClick}>
          <img className={styles.thumbnail} src={thumbnail} alt={title} />
          <span className={styles.title}>{title}</span>
          <span className={styles.channel}>{channelTitle}</span>
        </div>
      </li>
    );
  }
}

export default Video;
