import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import { Container, Typography } from "@material-ui/core";
import styles from "./style";
export default function DisplayError() {
  const classes = styles();
  return (
    // bgColor="#FCEFF9"
    <Container maxWidth="xs" className={classes.container}>
      <ErrorIcon className={classes.icon} />
      <Typography variant="h3" color="initial" className={classes.title}>
        Uhh..Error 500!
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Something went wrong on our backend.
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ textAlign: "center" }}
      >
        It's not your fault, it's us. Please refresh the page to try again
      </Typography>
    </Container>
  );
}
