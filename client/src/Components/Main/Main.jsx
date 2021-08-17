import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import useStyles from "./style";
export default function Main({ user }) {
  const classes = useStyles();
  return (
    <>
      <Navbar user={user} />
    </>
  );
}
