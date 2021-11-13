import React, { Component } from 'react';
import Video from './video';
import styles from './videos.module.css';

class Videos extends Component {
  render() {
    return (
      <ul className={styles.list}>
        {this.props.popularVideoList.map((video) => {
          return <Video key={video.id} info={video.snippet} />;
        })}
      </ul>
    );
  }
}

export default Videos;
