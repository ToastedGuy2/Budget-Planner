import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import TransactionTable from "../TransactionTable/TransactionTable.jsx";
import DisplaySummaries from "../DisplaySummaries/DisplaySummaries.jsx";
import Container from "@material-ui/core/Container";
import PacmanLoader from "react-spinners/PacmanLoader";
import CenterContainer from "../CenterContainer";
import useStyles from "./style.js";
export default function Main({ user, isUserAuthenticated }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      // const fetch
      if (user) {
      } else {
        isUserAuthenticated();
      }
    }
  }, [loading]);
  const classes = useStyles();
  if (loading) {
    return (
      <CenterContainer bgColor="#FCEFF9">
        <PacmanLoader color="#008ED5" loading="true" />
      </CenterContainer>
    );
  }
  if (user) {
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
}

// function App() {
//   return (

//   );
// }
