import React, { useState } from "react";
import { without } from "ramda";
import "./App.css";
import Cookies from "universal-cookie";

import PlayList from "./PlayList";
import ErrorAlert from "./ErrorAlert";
import PlayWindow from "./PlayWindow";
import Search from "./Search";
import SearchResults from "./SearchResults";
import youtube from "./youtube";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  const cookies = new Cookies();
  const [playlist, setPlaylist] = useState(cookies.get("playlist") || []);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playWindowOpen, setPlayWindowOpen] = useState(false);
  const [errorContent, setErrorContent] = useState();
  const onSearchButtonClick = async () => {
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
  const handleRemoveFromPlaylist = result => {
    const newPlaylist = without(
      [
        {
          videoId: result.id.videoId,
          title: result.snippet.title,
          imgSrc: result.snippet.thumbnails.default.url
        }
      ],
      playlist
    );
    setPlaylist(newPlaylist);
    cookies.set("playlist", newPlaylist, { path: "/" });
  };
  const handlePlayClick = () => {
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
    <div className="App">
      <Container>
        <div className="fancy-font title">Sampling</div>
      </Container>
      <Search
        setSearchString={setSearchString}
        searchString={searchString}
        onSearchButtonClick={onSearchButtonClick}
        handlePlayClick={handlePlayClick}
        playWindowOpen={playWindowOpen}
        setPlaylist={setPlaylist}
        setErrorContent={setErrorContent}
        playlist={playlist}
        cookies={cookies}
      />
      <Container>
        <Row>
          <Col sm={8}>
            {searchResults.length > 0 && !playWindowOpen && (
              <SearchResults
                playlist={playlist}
                results={searchResults}
                setPlaylist={setPlaylist}
                handleRemoveFromPlaylist={handleRemoveFromPlaylist}
                cookies={cookies}
              />
            )}
            {errorContent && !playWindowOpen && (
              <ErrorAlert content={errorContent} />
            )}
            {playWindowOpen && <PlayWindow playlist={playlist} />}
          </Col>
          <Col sm={4}>
            <PlayList
              playlist={playlist}
              handleRemoveFromPlaylist={handleRemoveFromPlaylist}
              setPlaylist={setPlaylist}
              cookies={cookies}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
