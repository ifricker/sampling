import React, { useState } from "react";
import { without } from "ramda";
import "./App.css";
import Cookies from "universal-cookie";

import ErrorAlert from "./ErrorAlert";
import TitleText from "./TitleText";
import SearchBar from "./SearchBar";
import MainWindow from "./MainWindow";

import { Container } from "@material-ui/core";

function App() {
  const cookies = new Cookies();
  const [playlist, setPlaylist] = useState(cookies.get("playlist") || []);
  const [searchResults, setSearchResults] = useState([]);
  const [playWindowOpen, setPlayWindowOpen] = useState(false);
  const [errorContent, setErrorContent] = useState();
  const handleRemoveFromPlaylist = (result, fromPlaylist) => {
    const song = () => {
      if (fromPlaylist) {
        return [result];
      } else {
        return [
          {
            videoId: result.id.videoId,
            title: result.snippet.title,
            imgSrc: result.snippet.thumbnails.default.url
          }
        ];
      }
    };
    const newPlaylist = without(song(), playlist);
    setPlaylist(newPlaylist);
    cookies.set("playlist", newPlaylist, { path: "/" });
  };

  return (
    <Container className="App" maxWidth="md">
      <TitleText />
      <SearchBar
        cookies={cookies}
        playlist={playlist}
        playWindowOpen={playWindowOpen}
        setErrorContent={setErrorContent}
        setPlaylist={setPlaylist}
        setPlayWindowOpen={setPlayWindowOpen}
        setSearchResults={setSearchResults}
      />
      {errorContent && (
        <ErrorAlert
          errorContent={errorContent}
          setErrorContent={setErrorContent}
        />
      )}
      <MainWindow
        cookies={cookies}
        handleRemoveFromPlaylist={handleRemoveFromPlaylist}
        playlist={playlist}
        playWindowOpen={playWindowOpen}
        searchResults={searchResults}
        setPlaylist={setPlaylist}
      />
    </Container>
  );
}

export default App;
