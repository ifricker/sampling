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
    <div className="center">
      {!inPlaylist && (
        <Button
          variant="outline-secondary"
          onClick={() => handleAddToPlaylist(result)}
        >
          add
        </Button>
      )}
      {inPlaylist && (
        <Button
          variant="dark"
          onClick={() => handleRemoveFromPlaylist(result, false)}
        >
          remove
        </Button>
      )}
    </div>
  );
};

export default AddToPlayListButton;
