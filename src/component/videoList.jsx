import React from "react";
import VideoItem from "./videoItem";
import { List } from "semantic-ui-react";

const VideoList = ({ videos, onVideoDetail }) => {
  return (
    <div>
      <List divided relaxed>
        {videos.map(video => (
          <VideoItem
            key={video.id.videoId}
            video={video}
            videoItemClick={onVideoDetail}
          />
        ))}
      </List>
    </div>
  );
};

export default VideoList;
