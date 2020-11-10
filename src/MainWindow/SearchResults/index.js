import React from "react";
import { append, includes, pluck } from "ramda";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export const SearchResults = props => {
  const {
    cookies,
    playlist,
    searchResults,
    setPlaylist,
    handleRemoveFromPlaylist
  } = props;
  const handleAddToPlaylist = result => {
    const newPlaylist = append(
      {
        videoId: result.id.videoId,
        title: result.snippet.title,
        imgSrc: result.snippet.thumbnails.default.url
      },
      playlist
    );
    setPlaylist(newPlaylist);
    cookies.set("playlist", JSON.stringify(newPlaylist), { path: "/" });
  };
  const inPlaylist = result => {
    return includes(result.id.videoId, pluck("videoId", playlist));
  };
  const handleAddClick = result => {
    if (inPlaylist(result)) {
      handleRemoveFromPlaylist(result);
    } else {
      handleAddToPlaylist(result);
    }
  };

  return (
    <Grid className="scroll" container spacing={3}>
      {searchResults.map(result => {
        return (
          <Grid item xs={4}>
            <Card className="card-class">
              <CardMedia
                component="img"
                image={result.snippet.thumbnails.medium.url}
                className={
                  inPlaylist(result) ? "grayscale-selected" : "grayscale"
                }
              />
              <CardContent>
                <Typography
                  className="title-text"
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {result.snippet.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color={inPlaylist(result) ? "secondary" : "default"}
                  className="search-add-to-playlist"
                  endIcon={inPlaylist(result) ? <RemoveIcon /> : <AddIcon />}
                  size="small"
                  onClick={() => handleAddClick(result)}
                >
                  {inPlaylist(result) ? "remove " : "add "}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchResults;
