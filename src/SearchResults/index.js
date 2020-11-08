import React from "react";
import { append, includes, pluck } from "ramda";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import AddToPlayListButton from "./AddToPlayListButton";

export const SearchResults = props => {
  const {
    cookies,
    playlist,
    results,
    setPlaylist,
    handleRemoveFromPlaylist
  } = props;
  const handleAddToPlaylist = result => {
    const newPlaylist = append(
      {
        videoId: result.id.videoId,
        title: result.snippet.title,
        imgSrc: result.snippet.thumbnails.default.url
      },
      playlist
    );
    setPlaylist(newPlaylist);
    cookies.set("playlist", JSON.stringify(newPlaylist), { path: "/" });
  };
  const inPlaylist = result => {
    const plid = pluck("video_id", playlist);
    const inc = includes(result, plid);
    return inc;
  };

  return (
    <Container className="padding-5">
      <Row md={3} className="scroll">
        {results.map(result => {
          return (
            <Col md={4} key={result.id.videoId}>
              <Card>
                <Card.Img
                  variant="top"
                  src={result.snippet.thumbnails.medium.url}
                />
                <Card.Body>
                  <Card.Title>{result.snippet.title}</Card.Title>
                  <Card.Text>{result.snippet.description}</Card.Text>
                  <AddToPlayListButton
                    handleAddToPlaylist={handleAddToPlaylist}
                    handleRemoveFromPlaylist={handleRemoveFromPlaylist}
                    inPlaylist={inPlaylist(result)}
                    result={result}
                  />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default SearchResults;
