import React from "react";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

export const PlayError = props => {
  return (
    <Container className="padding-5">
      <Alert variant="danger">
        <Alert.Heading>Playlist empty</Alert.Heading>
        <hr />
        <p>Add songs to playlist and try again.</p>
      </Alert>
    </Container>
  );
};

export default PlayError;
