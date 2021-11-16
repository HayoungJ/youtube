import React, { PureComponent } from 'react';
import Video from './video';
import styles from './videos.module.css';

class Videos extends PureComponent {
  render() {
    return (
      <ul className={styles.list} style={{ width: `${this.props.width}` }}>
        {this.props.videoList.map((video) => {
          return (
            <Video
              key={video.id}
              id={video.id}
              info={video}
              onPlay={this.props.handlePlay}
            />
          );
        })}
      </ul>
    );
  }
}

export default Videos;
