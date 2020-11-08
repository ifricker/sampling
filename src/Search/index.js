import React from "react";
import { append } from "ramda";
import axios from "axios";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

export const Search = props => {
  const {
    onSearchButtonClick,
    setSearchString,
    handlePlayClick,
    playWindowOpen,
    searchString,
    setAddError,
    setPlaylist,
    playlist,
    cookies
  } = props;
  const handleKeypress = e => {
    if (e.which === 13) {
      onSearchButtonClick();
    }
  };
  const onAddUrlClick = async () => {
    var videoId = searchString.split("v=")[1];
    if (videoId) {
      var ampersandPosition = videoId.indexOf("&");
    }
    if (videoId && ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    const url = `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${videoId}&format=json`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    await axios
      .get(proxyurl + url)
      .then(response => {
        const newPlaylist = append(
          {
            videoId: videoId,
            title: response.data.title,
            imgSrc: response.data.thumbnail_url
          },
          playlist
        );
        setSearchString("");
        setAddError(false);
        setPlaylist(newPlaylist);
        cookies.set("playlist", JSON.stringify(newPlaylist), { path: "/" });
      })
      .catch(err => {
        setAddError(true);
      });
  };

  return (
    <InputGroup>
      <FormControl
        placeholder="search youtube"
        aria-label="search youtube"
        aria-describedby="basic-addon2"
        type="text"
        name="searchString"
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        onKeyPress={handleKeypress}
      />
      <InputGroup.Append>
        <Button
          type="submit"
          variant="outline-secondary"
          onClick={() => onSearchButtonClick()}
        >
          Search
        </Button>
        <Button
          type="submit"
          variant="outline-secondary"
          onClick={() => onAddUrlClick()}
        >
          add url
        </Button>
        {!playWindowOpen && (
          <Button variant="outline-secondary" onClick={() => handlePlayClick()}>
            Play
          </Button>
        )}
        {playWindowOpen && (
          <Button variant="dark" onClick={() => handlePlayClick()}>
            Play
          </Button>
        )}
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Search;
