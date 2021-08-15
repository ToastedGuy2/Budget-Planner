import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
export default function Main({ user }) {
  return (
    <>
      {user ? (
        <Typography variant="h3"> {user.email} is logged </Typography>
      ) : (
        <Typography variant="h3"> Main page </Typography>
      )}
      <Link to="/signup">Go to Sign up</Link>
    </>
  );
}
