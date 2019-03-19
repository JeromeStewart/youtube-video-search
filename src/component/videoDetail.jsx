import React from "react";
import { Embed, Divider, Icon, Grid, Header } from "semantic-ui-react";
import moment from "moment";

const VideoDetail = ({ video }) => {
  const active = Object.keys(video).length > 0 ? true : false;
  if (!active)
    return (
      <h3>
        Search for videos! <br /> This app was created by Jerome Stewart 😁
      </h3>
    );
  return (
    <React.Fragment>
      <Embed
        active={active}
        icon="arrow circle right"
        id={video.id.videoId}
        iframe={{
          allowFullScreen: true
        }}
        placeholder={video.snippet.thumbnails.high.url}
        source="youtube"
      />
      <Divider horizontal>
        <Icon name="info" />
      </Divider>
      <Grid textAlign="center">
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">Channel title</Header>
            <p>{video.snippet.channelTitle}</p>
            <Header as="h2">Video description</Header>
            <p>{video.snippet.description}</p>
            <Header as="h2">Post date</Header>
            <p>{moment(video.snippet.publishedAt).format("MMM-DD-YYYY")}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default VideoDetail;
