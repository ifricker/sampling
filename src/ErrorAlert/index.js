import React from "react";

import { IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

export const ErrorAlert = props => {
  const { errorContent, setErrorContent } = props;

  return (
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setErrorContent(null);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <strong>{errorContent.heading} </strong>
      {errorContent.body}
    </Alert>
  );
};

export default ErrorAlert;
