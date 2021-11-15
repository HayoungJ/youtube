import React, { Component } from 'react';
import styles from './app.module.css';
import { fetchPopularVideo, fetchSearchedVideo } from './api/youtubeAPI';
import Videos from './components/videos';
import VideoPlayer from './components/videoPlayer';
import Navbar from './components/navbar';

class App extends Component {
  state = {
    fetchInfo: {
      q: undefined,
      publishedBefore: undefined,
      pageToken: undefined,
      type: 'popular',
      videoList: [],
    },
    videoPlaying: {
      isVideoPlaying: false,
      videoInfo: {},
    },
  };

  observerRef = React.createRef();

  async componentDidMount() {
    await this.loadPopularVideo();
    // Infinite Scroll observer
    const observer = new IntersectionObserver(this.observeCallback);
    observer.observe(this.observerRef.current);
  }

  handlePlay = (id) => {
    const videoList = this.state.fetchInfo.videoList;
    const video =
      videoList.length > 0
        ? videoList.find((video) => video.id === id)
        : undefined;
    if (!video) throw new Error(`Can't play the selected video`);

    const videoPlaying = {
      isVideoPlaying: true,
      videoInfo: video,
    };
    this.setState({ videoPlaying });
  };

  finishPlay = () => {
    const videoPlaying = {
      isVideoPlaying: false,
      videoInfo: {},
    };
    this.setState({ videoPlaying });

    const observer = new IntersectionObserver(this.observeCallback);
    observer.observe(this.observerRef.current);
  };

  handleSearch = async (q) => {
    this.finishPlay();
    this.loadSearchedVideo(q);
  };

  handleReload = () => {
    this.finishPlay();
    this.loadPopularVideo();
  };

  // Default Video : The most popular videos
  loadPopularVideo = async () => {
    const fetchInfo = {
      q: undefined,
      publishedBefore: this.getDate(),
      pageToken: undefined,
      type: 'popular',
      videoList: [],
    };

    const { nextPageToken, videoList } = await fetchPopularVideo(fetchInfo);
    fetchInfo.pageToken = nextPageToken;
    fetchInfo.videoList = videoList;

    this.setState({ fetchInfo });
  };

  loadSearchedVideo = async (q) => {
    const fetchInfo = {
      q,
      publishedBefore: this.getDate(),
      pageToken: undefined,
      type: 'search',
      videoList: [],
    };

    const { nextPageToken, videoList } = await fetchSearchedVideo(fetchInfo);
    fetchInfo.pageToken = nextPageToken;
    fetchInfo.videoList = videoList;

    this.setState({ fetchInfo });
  };

  loadMoreVideo = async () => {
    const fetchInfo = this.state.fetchInfo;
    const { nextPageToken, videoList } =
      fetchInfo.type === 'search'
        ? await fetchSearchedVideo(fetchInfo)
        : fetchInfo.type === 'popular'
        ? await fetchPopularVideo(fetchInfo)
        : {};
    const newVideoList = fetchInfo.videoList.concat(videoList);
    const newFetchInfo = {
      ...fetchInfo,
      pageToken: nextPageToken,
      videoList: newVideoList,
    };

    this.setState({ fetchInfo: newFetchInfo });
  };

  observeCallback = (entries, observer) => {
    if (this.state.videoPlaying.isVideoPlaying) {
      observer.unobserve(this.observerRef.current);
      return;
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadMoreVideo();
      }
    });
  };

  getDate = () => {
    return new Date().toISOString();
  };

  getRandomVideo = (list, num) => {
    const randomIndex = [];
    for (let i = 0; i < num; i++) {
      const pick = Math.floor(Math.random() * list.length);
      randomIndex.push(pick);
    }
    const randomVideo = list.filter((video, index) =>
      randomIndex.includes(index)
    );
    return randomVideo;
  };

  render() {
    const isVideoPlaying = this.state.videoPlaying.isVideoPlaying;
    return (
      <div className={styles.page}>
        <Navbar onReload={this.handleReload} onSearch={this.handleSearch} />
        <section className={styles.content}>
          {isVideoPlaying ? (
            <VideoPlayer info={this.state.videoPlaying.videoInfo} />
          ) : (
            <></>
          )}
          <Videos
            videoList={
              isVideoPlaying
                ? this.getRandomVideo(this.state.fetchInfo.videoList, 6)
                : this.state.fetchInfo.videoList
            }
            onSelect={this.handlePlay}
            width={isVideoPlaying ? '300px' : '100%'}
          />
        </section>
        <div ref={this.observerRef} className={styles.observer}></div>
      </div>
    );
  }
}

export default App;
