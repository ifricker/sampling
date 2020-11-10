import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBarButton = props => {
  const { action, buttonType } = props;

  var button = () => {
    switch (buttonType) {
      case "search":
        return <SearchIcon />;
      case "add":
        return <AddIcon />;
      case "play":
        return <PlayArrowIcon />;
      case "pause":
        return <PauseIcon />;
      default:
        return null;
    }
  };

  return (
    <IconButton onClick={() => action()} className="form-icon" edge="end">
      {button()}
    </IconButton>
  );
};

export default SearchBarButton;
