import "./videoItem.css";
import React from "react";
import { List } from "semantic-ui-react";

const VideoItem = ({ video, videoItemClick }) => {
  return (
    <List.Item className="videoItem">
      <img
        src={video.snippet.thumbnails.medium.url}
        onClick={() => videoItemClick(video)}
      />
      <List.Content>{video.snippet.title}</List.Content>
    </List.Item>
  );
};

export default VideoItem;
