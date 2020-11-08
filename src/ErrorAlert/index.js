import React from "react";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

export const ErrorAlert = props => {
  const { content } = props;

  return (
    <Container className="padding-5">
      <Alert variant="danger">
        <Alert.Heading>{content.heading}</Alert.Heading>
        <hr />
        <p>{content.body}</p>
      </Alert>
    </Container>
  );
};

export default ErrorAlert;
