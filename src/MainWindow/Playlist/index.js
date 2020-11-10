import React from "react";

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction
} from "@material-ui/core";

import PlaylistItem from "./PlaylistItem";

export const Playlist = props => {
  const { handleRemoveFromPlaylist, playlist, setPlaylist, cookies } = props;
  const handleClearPlaylist = () => {
    setPlaylist([]);
    cookies.remove("playlist");
  };

  return (
    <div>
      <List>
        <ListItem>
          <span className="fancy-font">Playlist</span>
          <ListItemSecondaryAction>
            <Button
              className="color-grey"
              edge="end"
              variant="outlined"
              onClick={() => handleClearPlaylist()}
            >
              Clear Playlist
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider />
      <List className="list-scroll">
        {playlist.map(video => {
          return (
            <PlaylistItem
              key={video.videoId}
              handleRemoveFromPlaylist={handleRemoveFromPlaylist}
              video={video}
            />
          );
        })}
      </List>
    </div>
  );
};

export default Playlist;
