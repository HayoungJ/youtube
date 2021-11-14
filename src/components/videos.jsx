import React, { Component } from 'react';
import Video from './video';
import styles from './videos.module.css';

class Videos extends Component {
  render() {
    return (
      <ul
        className={`${styles.list} ${
          this.props.isVideoSelected
            ? styles['list-shrink']
            : styles['list-stretch']
        }`}
      >
        {this.props.popularVideoList.map((video) => {
          return (
            <Video
              key={video.id}
              id={video.id}
              info={video.snippet}
              onSelect={this.props.onSelect}
            />
          );
        })}
      </ul>
    );
  }
}

export default Videos;
