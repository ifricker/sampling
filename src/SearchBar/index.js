import React, { useState } from "react";
import { append, uniq } from "ramda";
import axios from "axios";

import { Box, FormControl, Input, InputAdornment } from "@material-ui/core";

import SearchBarButton from "./SearchBarButton";
import youtube from "../youtube";

export const SearchBar = props => {
  const {
    cookies,
    playlist,
    playWindowOpen,
    setErrorContent,
    setPlaylist,
    setPlayWindowOpen,
    setSearchResults
  } = props;

  const [searchString, setSearchString] = useState("");

  const handleKeypress = e => {
    if (e.which === 13) {
      onSearchClick();
    }
  };
  const onSearchClick = async () => {
    await youtube
      .get("/search", {
        params: {
          q: searchString
        }
      })
      .then(response => {
        setSearchResults(response.data.items);
        setErrorContent(null);
      })
      .catch(err => {
        setErrorContent({
          heading: "API Limit Reached",
          body: "You can still add youtube url above."
        });
      });
    setPlayWindowOpen(false);
  };

  const onAddClick = async () => {
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
        const newPlaylist = uniq(
          append(
            {
              videoId: videoId,
              title: response.data.title,
              imgSrc: response.data.thumbnail_url
            },
            playlist
          )
        );
        setSearchString("");
        setErrorContent(null);
        setPlaylist(newPlaylist);
        cookies.set("playlist", JSON.stringify(newPlaylist), { path: "/" });
      })
      .catch(err => {
        setErrorContent({
          heading: "Video Not Found",
          body: "Check youtube url and try again."
        });
      });
  };
  const onPlayClick = () => {
    if (playWindowOpen) {
      setPlayWindowOpen(false);
    } else {
      if (playlist.length > 0) {
        setPlayWindowOpen(true);
        setErrorContent(null);
      } else {
        setErrorContent({
          heading: "Playlist empty",
          body: "Add songs to playlist and try again."
        });
      }
    }
  };

  return (
    <Box>
      <FormControl variant="outlined" fullWidth>
        <Input
          style={{ margin: 8 }}
          id="outlined-adornment-password"
          placeholder="search youtube or paste youtube url..."
          fullWidth
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          onKeyPress={handleKeypress}
          endAdornment={
            <InputAdornment position="end">
              <SearchBarButton action={onSearchClick} buttonType="search" />
              <SearchBarButton action={onAddClick} buttonType="add" />
              <SearchBarButton
                action={onPlayClick}
                buttonType={playWindowOpen ? "pause" : "play"}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
