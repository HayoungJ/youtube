import { Component } from 'react';
import './app.css';
import Videos from './components/videos';

class App extends Component {
  state = {
    popularVideoList: [],
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

  render() {
    return <Videos popularVideoList={this.state.popularVideoList} />;
  }
}

export default App;
