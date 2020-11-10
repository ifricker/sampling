import React, { useState } from "react";
import { without } from "ramda";
import ReactPlayer from "react-player/youtube";

import { Button, Grid } from "@material-ui/core";

export const PlayWindow = props => {
  const { playlist } = props;
  const [startTime, setStartTime] = useState(Math.floor(Math.random() * 181));
  const [video, setVideo] = useState(
    playlist[Math.floor(Math.random() * playlist.length)]
  );
  const videoSrc = () => {
    return `https://www.youtube.com/embed/${video.videoId}?autoplay=1?start=${startTime}`;
  };
  const handleClickShuffleCurrent = () => {
    setStartTime(Math.floor(Math.random() * 241));
  };
  const handleClickNext = async () => {
    if (playlist.length > 1) {
      setVideo(
        without([video], playlist)[
          Math.floor(Math.random() * (playlist.length - 1))
        ]
      );
    }
    setStartTime(Math.floor(Math.random() * 241));
  };

  return (
    <Grid className="center" container spacing={3}>
      <Grid item xs={12}>
        <ReactPlayer width="100%" url={videoSrc()} playing={true} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <Button
          variant="contained"
          onClick={() => handleClickShuffleCurrent()}
          className="color-grey"
        >
          Shuffle Current
        </Button>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={3}>
        <Button
          onClick={() => handleClickNext()}
          className="color-grey"
          variant="contained"
        >
          Next
        </Button>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default PlayWindow;
