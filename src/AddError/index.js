import React from "react";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

export const AddError = props => {
  return (
    <Container className="padding-5">
      <Alert variant="danger">
        <Alert.Heading>Video Not found</Alert.Heading>
        <hr />
        <p>Check youtube url, and try again.</p>
      </Alert>
    </Container>
  );
};

export default AddError;
