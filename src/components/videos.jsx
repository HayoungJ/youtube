import React, { Component } from 'react';
import Video from './video';
import styles from './videos.module.css';

class Videos extends Component {
  render() {
    return (
      <ul className={styles.list} style={{ width: `${this.props.width}` }}>
        {this.props.videoList.map((video) => {
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
