import "./App.css";
import React, { Component } from "react";
import SearchBar from "./searchBar";
import { Container, Grid, Button } from "semantic-ui-react";
import youtubeApi from "../apis/youtubeApi";
import VideoList from "./videoList";
import VideoDetail from "./videoDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      videos: [],
      videoDetail: {},
      pageToken: {
        nextPageToken: "",
        prevPageToken: ""
      }
    };
    this.searchTerm = React.createRef();
  }

  HandleSearch = e => {
    this.setState({
      searchInput: e.currentTarget.value
    });
    localStorage.setItem("term", e.currentTarget.value);
  };

  //Handle Youtube API request in this method.

  handleSubmit = async e => {
    e.preventDefault();
    const response = await youtubeApi.get("search", {
      params: { q: this.state.searchInput }
    });

    const pageToken = { ...this.state.pageToken };

    pageToken.nextPageToken = response.data.nextPageToken;

    this.setState({
      videos: response.data.items,
      videoDetail: response.data.items[0],
      pageToken
    });
  };

  handleVideoDetail = video => {
    this.setState({ videoDetail: video });
  };

  handleVideoList = async token => {
    const response = await youtubeApi.get("search", {
      params: {
        pageToken: token,
        q: this.state.searchInput
      }
    });

    console.log(response);

    const pageToken = { ...this.state.pageToken };

    pageToken.nextPageToken = response.data.nextPageToken;
    pageToken.prevPageToken = response.data.prevPageToken;

    this.setState({
      videos: response.data.items,
      videoDetail: response.data.items[0],
      pageToken
    });
  };

  render() {
    const { searchInput, videos, videoDetail, pageToken } = this.state;
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
              {pageToken.prevPageToken === "" ? null : (
                <Button
                  onClick={() => this.handleVideoList(pageToken.prevPageToken)}
                  content="Previous"
                  icon="left arrow"
                  labelPosition="left"
                />
              )}
              {this.state.videos.length === 0 ? null : (
                <Button
                  onClick={() => this.handleVideoList(pageToken.nextPageToken)}
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
