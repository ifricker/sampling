import React, { useState } from "react";
import { without } from "ramda";
import "./App.css";
import Cookies from "universal-cookie";

import title from "./title.png";
import AddError from "./AddError";
import ApiLimitWindow from "./ApiLimitWindow";
import PlayList from "./PlayList";
import PlayWindow from "./PlayWindow";
import Search from "./Search";
import SearchResults from "./SearchResults";
import youtube from "./youtube";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function App() {
  const cookies = new Cookies();
  const [playlist, setPlaylist] = useState(cookies.get("playlist") || []);
  const [searchString, setSearchString] = useState("");
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
    } else {
      setPlayWindowOpen(true);
      setAddError(false);
    }
  };

  return (
    <div className="App">
      <Container>
        <Image className="title-height" src={title} />
      </Container>
      <Search
        setSearchString={setSearchString}
        searchString={searchString}
        onSearchButtonClick={onSearchButtonClick}
        handlePlayClick={handlePlayClick}
        playWindowOpen={playWindowOpen}
        setPlaylist={setPlaylist}
        setAddError={setAddError}
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
