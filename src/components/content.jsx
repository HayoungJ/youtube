import React, { PureComponent } from 'react';
import styles from './content.module.css';
import { getRandomVideo } from '../utils';
import Videos from './video/videos';
import VideoPlayer from './video/videoPlayer';
import Loader from './loader';

class Content extends PureComponent {
  render() {
    const {
      videoList,
      videoPlaying: { isVideoPlaying, videoInfo },
      isLoading,
      handlePlay,
      observerRef,
    } = this.props;
    return (
      <>
        <section className={styles.content}>
          {isVideoPlaying ? <VideoPlayer info={videoInfo} /> : <></>}
          <Videos
            videoList={
              isVideoPlaying ? getRandomVideo(videoList, 6) : videoList
            }
            handlePlay={handlePlay}
            width={isVideoPlaying ? '300px' : '100%'}
          />
          {isLoading ? <Loader /> : <></>}
        </section>
        <div ref={observerRef} className={styles.observer}></div>
      </>
    );
  }
}

export default Content;
