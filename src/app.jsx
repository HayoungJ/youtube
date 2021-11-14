import { Component } from 'react';
import styles from './app.module.css';
import Videos from './components/videos';
import VideoInfo from './components/videoInfo';

class App extends Component {
  state = {
    popularVideoList: [],
    isVideoSelected: false,
    selectedVideo: {},
  };

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyC0TTfG7oyacZt0lha5u9O9bC01JGaMtI0',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        this.setState({ popularVideoList: JSON.parse(result).items })
      )
      .catch((error) => console.log('error', error));
  }

  handleSelect = (id) => {
    const selectedVideoArray = this.state.popularVideoList.filter(
      (video) => video.id === id
    );
    if (selectedVideoArray.length === 1) {
      this.setState({
        isVideoSelected: true,
        selectedVideo: selectedVideoArray[0],
      });
    } else {
      console.log(
        'error : 같은 아이디를 가진 동영상이 두 개 이상일 수 없습니다.'
      );
    }
  };

  render() {
    return (
      <section className={styles.body}>
        {this.state.isVideoSelected ? (
          <VideoInfo
            key={this.state.selectedVideo.id}
            id={this.state.selectedVideo.id}
            info={this.state.selectedVideo.snippet}
          />
        ) : (
          <></>
        )}
        <Videos
          popularVideoList={this.state.popularVideoList}
          onSelect={this.handleSelect}
          width={this.state.isVideoSelected ? 30 : 100}
        />
        ;
      </section>
    );
  }
}

export default App;
