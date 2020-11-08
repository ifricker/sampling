import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

export const PlayList = props => {
  const { handleRemoveFromPlaylist, playlist, setPlaylist, cookies } = props;
  const handleClearPlaylist = () => {
    setPlaylist([]);
    cookies.remove("playlist");
  };

  return (
    <Container className="scroll">
      <ListGroup variant="flush">
        {playlist.length > 0 && (
          <Row className="padding-5">
            <Col>
              <h3 className="fancy-font">Playlist</h3>
            </Col>
            <Col>
              <Button variant="secondary" onClick={() => handleClearPlaylist()}>
                Clear Playlist
              </Button>
            </Col>
          </Row>
        )}
        {playlist.map(song => {
          return (
            <ListGroup.Item>
              <Row>
                <Col className="horizontal" md={4}>
                  <Image src={song.imgSrc} thumbnail />
                </Col>
                <Col className="horizontal" md={6}>
                  <div className="small-text">{song.title}</div>
                </Col>
                <Col className="horizontal" md={2}>
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveFromPlaylist(song, true)}
                  >
                    x
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default PlayList;
