import React, { useState } from "react";
import { without } from "ramda";
import "./App.css";
import Cookies from "universal-cookie";

import AddError from "./AddError";
import ApiLimitWindow from "./ApiLimitWindow";
import PlayList from "./PlayList";
import PlayError from "./PlayError";
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
  const [playError, setPlayError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [playWindowOpen, setPlayWindowOpen] = useState(false);
  const [addError, setAddError] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const onSearchButtonClick = async () => {
    await youtube
      .get("/search", {
        params: {
          q: searchString
        }
      })
      .then(response => {
        setSearchResults(response.data.items);
      })
      .catch(err => {
        setApiLimitReached(true);
      });
    setAddError(false);
    setPlayError(false);
    setPlayWindowOpen(false);
  };
  const handleRemoveFromPlaylist = result => {
    const newPlaylist = without([result], playlist);
    setPlaylist(newPlaylist);
    cookies.set("playlist", newPlaylist, { path: "/" });
  };
  const handlePlayClick = () => {
    if (playWindowOpen) {
      setPlayWindowOpen(false);
      setAddError(false);
      setPlayError(false);
    } else {
      if (playlist.length > 0) {
        setPlayWindowOpen(true);
      } else {
        setPlayError(true);
      }
      setAddError(false);
      setApiLimitReached(false);
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
        setAddError={setAddError}
        setPlayError={setPlayError}
        playlist={playlist}
        cookies={cookies}
        setApiLimitReached={setApiLimitReached}
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
            {apiLimitReached && !playWindowOpen && <ApiLimitWindow />}
            {addError && !playWindowOpen && <AddError />}
            {playError && !playWindowOpen && <PlayError />}
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
