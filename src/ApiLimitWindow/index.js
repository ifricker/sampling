import React from "react";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

export const ApiLimitWindow = props => {
  return (
    <Container className="padding-5">
      <Alert variant="danger">
        <Alert.Heading>Hobby Project. API Limit Reached.</Alert.Heading>
        <hr />
        <p>You can still add youtube url above.</p>
      </Alert>
    </Container>
  );
};

export default ApiLimitWindow;
