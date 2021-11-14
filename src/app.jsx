import { Component } from 'react';
import styles from './app.module.css';
import Videos from './components/videos';
import VideoInfo from './components/videoInfo';
import Navbar from './components/navbar';

class App extends Component {
  state = {
    videoList: [],
    isVideoSelected: false,
    selectedVideo: {},
  };

  componentDidMount() {
    this.fetchPopularVideos();
  }

  fetchPopularVideos = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyC0TTfG7oyacZt0lha5u9O9bC01JGaMtI0',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => this.parseVideoData(result))
      .catch((error) => console.log('error', error));
  };

  fetchSearchedVideos = (keyword) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyC0TTfG7oyacZt0lha5u9O9bC01JGaMtI0`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => this.parseVideoData(result))
      .catch((error) => console.log('error', error));
  };

  parseVideoData = (rawData) => {
    const rawVideoList = JSON.parse(rawData).items;
    const videoList = rawVideoList.map((video) => {
      const videoId =
        typeof video.id === 'string' ? video.id : video.id.videoId;
      return { id: videoId, snippet: video.snippet };
    });
    this.setState({ videoList });
  };

  handleSelect = (id) => {
    const selectedVideoArray = this.state.videoList.filter(
      (video) => video.id === id
    );
    if (selectedVideoArray.length === 1) {
      this.setState({
        isVideoSelected: true,
        selectedVideo: selectedVideoArray[0],
      });
    } else {
      console.log(
        'error : 같은 아이디를 가진 동영상이 없거나 두 개 이상일 수 없습니다.'
      );
    }
  };

  handleClickLogo = () => {
    this.setState({ isVideoSelected: false });
    this.fetchPopularVideos();
  };

  handleSearch = (keyword) => {
    this.fetchSearchedVideos(keyword);
  };

  render() {
    return (
      <>
        <Navbar
          onClickLogo={this.handleClickLogo}
          onSearch={this.handleSearch}
        />
        <section className={styles.content}>
          {this.state.isVideoSelected ? (
            <VideoInfo
              id={this.state.selectedVideo.id}
              info={this.state.selectedVideo.snippet}
            />
          ) : (
            <></>
          )}
          <Videos
            videoList={this.state.videoList}
            onSelect={this.handleSelect}
            width={this.state.isVideoSelected ? '300px' : '100%'}
          />
        </section>
      </>
    );
  }
}

export default App;
