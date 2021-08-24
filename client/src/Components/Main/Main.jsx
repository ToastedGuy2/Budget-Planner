import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import TransactionTable from "../TransactionTable/TransactionTable.jsx";
import DisplaySummaries from "../DisplaySummaries/DisplaySummaries.jsx";
import Container from "@material-ui/core/Container";
import useStyles from "./style.js";
export default function Main({ user }) {
  const classes = useStyles();
  return (
    <>
      <Navbar user={user} />
      <Container maxWidth="lg" className={classes.container}>
        <DisplaySummaries />
        <TransactionTable />
      </Container>
    </>
  );
}
