import React from "react";
import { append, includes, pluck } from "ramda";

import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
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
    return includes(result.id.videoId, pluck("videoId", playlist));
  };

  return (
    <div className="scroll pad-top">
      <CardColumns>
        {results.map(result => {
          return (
            <Card>
              <Card.Img
                className={
                  inPlaylist(result) ? "grayscale-selected" : "grayscale"
                }
                variant="top"
                src={result.snippet.thumbnails.medium.url}
              />
              <Card.Body>
                <Card.Text className="title-text">
                  {result.snippet.title}
                </Card.Text>
                <AddToPlayListButton
                  handleAddToPlaylist={handleAddToPlaylist}
                  handleRemoveFromPlaylist={handleRemoveFromPlaylist}
                  inPlaylist={inPlaylist(result)}
                  result={result}
                />
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
};

export default SearchResults;
