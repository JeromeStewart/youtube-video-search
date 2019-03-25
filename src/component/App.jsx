import "./App.css";
import React, { Component } from "react";
import SearchBar from "./searchBar";
import { Container, Grid, Button } from "semantic-ui-react";
import VideoList from "./videoList";
import VideoDetail from "./videoDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      videos: [],
      videoDetail: {},
      nextPageToken: "",
      prevPageToken: ""
    };
    this.searchTerm = React.createRef();
  }

  componentDidMount = () => {
    const localSearchterm =
      localStorage["term"] !== null ? localStorage.getItem("term") : "";

    this.setState({ searchInput: localSearchterm });
  };

  HandleSearch = e => {
    this.setState({
      searchInput: e.currentTarget.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`/.netlify/functions/getVideos?q=${this.state.searchInput}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          videos: data.items,
          videoDetail: data.items[0],
          nextPageToken: data.nextPageToken
        })
      );

    localStorage.setItem("term", this.state.searchInput);
  };

  handleVideoDetail = video => {
    this.setState({ videoDetail: video });
  };

  handleVideoList = token => {
    fetch(
      `/.netlify/functions/getVideos?q=${
        this.state.searchInput
      }&pageToken=${token}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          videos: data.items,
          videoDetail: data.items[0],
          nextPageToken: data.nextPageToken,
          prevPageToken: data.prevPageToken
        })
      );
  };

  render() {
    const {
      searchInput,
      videos,
      videoDetail,
      nextPageToken,
      prevPageToken
    } = this.state;
    return (
      <Container>
        <SearchBar
          onSearch={this.HandleSearch}
          searchTerm={searchInput}
          onSubmit={this.handleSubmit}
        />
        <Grid>
          <Grid.Row className="video">
            <Grid.Column width="eleven">
              <VideoDetail video={videoDetail} />
            </Grid.Column>
            <Grid.Column width="five">
              <VideoList
                videos={videos}
                onVideoDetail={this.handleVideoDetail}
              />
              {prevPageToken === "" ? null : (
                <Button
                  onClick={() => this.handleVideoList(prevPageToken)}
                  content="Previous"
                  icon="left arrow"
                  labelPosition="left"
                />
              )}
              {this.state.videos.length === 0 ? null : (
                <Button
                  onClick={() => this.handleVideoList(nextPageToken)}
                  content="Next"
                  icon="right arrow"
                  labelPosition="right"
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
