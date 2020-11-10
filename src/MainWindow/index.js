import React from "react";

import { Grid } from "@material-ui/core";

import Playlist from "./Playlist";
import PlayWindow from "./PlayWindow";
import SearchResults from "./SearchResults";

export const MainWindow = props => {
  const {
    cookies,
    handleRemoveFromPlaylist,
    playlist,
    playWindowOpen,
    searchResults,
    setPlaylist
  } = props;

  return (
    <Grid container className="main-window" spacing={3}>
      <Grid item className="left" xs={8}>
        {searchResults.length > 0 && !playWindowOpen && (
          <SearchResults
            playlist={playlist}
            searchResults={searchResults}
            setPlaylist={setPlaylist}
            handleRemoveFromPlaylist={handleRemoveFromPlaylist}
            cookies={cookies}
          />
        )}
        {playWindowOpen && <PlayWindow playlist={playlist} />}
      </Grid>
      <Grid item className="right" xs={4}>
        <Playlist
          cookies={cookies}
          handleRemoveFromPlaylist={handleRemoveFromPlaylist}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      </Grid>
    </Grid>
  );
};

export default MainWindow;
