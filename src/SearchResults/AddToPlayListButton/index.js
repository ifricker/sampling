import React from "react";

import Button from "react-bootstrap/Button";

export const AddToPlayListButton = props => {
  const {
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    inPlaylist,
    result
  } = props;

  return (
    <div>
      {!inPlaylist && (
        <Button variant="primary" onClick={() => handleAddToPlaylist(result)}>
          Add To Playlist
        </Button>
      )}
      {inPlaylist && (
        <Button
          variant="danger"
          onClick={() => handleRemoveFromPlaylist(result)}
        >
          Remove From Playlist
        </Button>
      )}
    </div>
  );
};

export default AddToPlayListButton;
