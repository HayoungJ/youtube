import React, { Component } from 'react';
import Video from './video';
import VideoInfo from './videoInfo';
import styles from './videos.module.css';

class Videos extends Component {
  state = {
    isVideoSelected: false,
    selectedVideo: {},
  };

  onSelect = (id) => {
    const selectedVideoArray = this.props.popularVideoList.filter(
      (video) => video.id === id
    );
    if (selectedVideoArray.length === 1) {
      this.setState({ isVideoSelected: true });
      this.setState({ selectedVideo: selectedVideoArray[0] });
    } else {
      console.log(
        'error : 같은 아이디를 가진 동영상이 두 개 이상일 수 없습니다.'
      );
    }
  };

  render() {
    return (
      <div
        className={`${styles.body} ${
          this.state.isVideoSelected
            ? styles[`info-opened`]
            : styles[`info-closed`]
        }`}
      >
        {this.state.isVideoSelected ? (
          <VideoInfo
            key={this.state.selectedVideo.id}
            id={this.state.selectedVideo.id}
            info={this.state.selectedVideo.snippet}
          />
        ) : (
          <></>
        )}
        <ul className={styles.list}>
          {this.props.popularVideoList.map((video) => {
            return (
              <Video
                key={video.id}
                id={video.id}
                info={video.snippet}
                isVideoSelected={this.state.isVideoSelected}
                onSelect={this.onSelect}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Videos;
