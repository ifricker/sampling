import React from "react";

import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

export const PlaylistItem = props => {
  const { handleRemoveFromPlaylist, video } = props;

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar variant="square" alt="A" src={video.imgSrc} />
      </ListItemAvatar>
      <ListItemText secondary={<span>{video.title}</span>} />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => handleRemoveFromPlaylist(video, true)}
          className="form-icon"
          edge="end"
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PlaylistItem;
