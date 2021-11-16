import React, { Component } from 'react';
import styles from './app.module.css';
import { fetchPopularVideo, fetchSearchedVideo } from './api/youtubeAPI';
import { getDate } from './utils';
import { scrollObserver } from './utils/scroll';
import Navbar from './components/navbar';
import Content from './components/content';

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
    isLoading: false,
  };

  observerRef = React.createRef();

  async componentDidMount() {
    await this.loadPopularVideo();
    scrollObserver(this.observerRef.current, this.handleScroll);
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

  loadPopularVideo = async () => {
    this.showLoadingIndicator();

    const fetchInfo = {
      q: undefined,
      publishedBefore: getDate(),
      pageToken: undefined,
      type: 'popular',
      videoList: [],
    };

    const { nextPageToken, videoList } = await fetchPopularVideo(fetchInfo);
    fetchInfo.pageToken = nextPageToken;
    fetchInfo.videoList = videoList;

    this.setState({ fetchInfo });

    this.hideLoadingIndicator();
  };

  loadSearchedVideo = async (q) => {
    const fetchInfo = {
      q,
      publishedBefore: getDate(),
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
    this.showLoadingIndicator();

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

    this.hideLoadingIndicator();
  };

  handleScroll = (entries, observer) => {
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

  showLoadingIndicator = () => {
    this.setState({ isLoading: true });
  };

  hideLoadingIndicator = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className={styles.page}>
        <Navbar onReload={this.handleReload} onSearch={this.handleSearch} />
        <Content
          videoList={this.state.fetchInfo.videoList}
          videoPlaying={this.state.videoPlaying}
          isLoading={this.state.isLoading}
          handlePlay={this.handlePlay}
          observerRef={this.observerRef}
        />
      </div>
    );
  }
}

export default App;
