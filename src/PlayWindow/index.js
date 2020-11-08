import React, { useState } from "react";
import { without } from "ramda";
import ReactPlayer from "react-player";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const PlayWindow = props => {
  const { playlist } = props;
  const [startTime, setStartTime] = useState(Math.floor(Math.random() * 181));
  const [video, setVideo] = useState(
    playlist[Math.floor(Math.random() * playlist.length)]
  );
  const videoSrc = () =>
    `https://www.youtube.com/embed/${video.videoId}?autoplay=1?start=${startTime}`;
  const handleClickShuffleCurrent = () => {
    setStartTime(Math.floor(Math.random() * 241));
  };
  const handleClickNext = () => {
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
    <Container className="padding-5">
      <div style={{ width: 660, height: "auto" }}>
        <ReactPlayer url={videoSrc()} playing={true} />
      </div>
      <div>
        <Row className="text-center padding-5">
          <Col md={2} />
          <Col md={4}>
            <Button
              variant="secondary"
              onClick={() => handleClickShuffleCurrent()}
              size="lg"
            >
              Shuffle Current
            </Button>
          </Col>
          <Col md={4}>
            <Button
              variant="secondary"
              onClick={() => handleClickNext()}
              size="lg"
            >
              Next
            </Button>
          </Col>
          <Col md={2} />
        </Row>
      </div>
    </Container>
  );
};

export default PlayWindow;
