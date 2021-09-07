import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import TransactionTable from "../TransactionTable/TransactionTable.jsx";
import DisplaySummaries from "../DisplaySummaries/DisplaySummaries.jsx";
import Container from "@material-ui/core/Container";
import PacmanLoader from "react-spinners/PacmanLoader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CenterContainer from "../CenterContainer";
import { DateTime } from "luxon";
import axios from "axios";
import useStyles from "./style.js";
import DisplayError from "../DisplayError/DisplayError";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
export default function Main({ user, isUserAuthenticated }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  useEffect(() => {
    if (loading) {
      const fetchMonthSummary = () => {
        const { month, year } = DateTime.utc();
        return axios.get(
          `/api/users/${user.id}/summary/monthly/${month}/${year}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
      };
      const displayError = () => {
        setError(true);
        setLoading(false);
      };
      if (user) {
        fetchMonthSummary()
          .then(({ data }) => {
            setData(data);
            setLoading(false);
          })
          .catch((error) => {
            displayError();
          });
      } else {
        isUserAuthenticated()
          .then((result) => {
            if (!result) {
              localStorage.setItem("show_redirect_alert", true);
              setRedirectToLogin(true);
              setLoading(false);
            }
          })
          .catch((error) => {
            displayError();
          });
      }
    }
  });
  const classes = useStyles();
  if (loading) {
    return (
      // TODO: Fix LOADER on smaller screens
      <CenterContainer bgColor="#FCEFF9">
        <PacmanLoader color="#008ED5" loading="true" size={45} />
      </CenterContainer>
    );
  }
  if (user && data) {
    return (
      <>
        <Navbar user={user} />
        <Container maxWidth="lg" className={classes.container}>
          <DisplaySummaries
            budget={data.budget}
            expenses={data.expenses}
            income={data.income}
          />
          <TransactionTable transactions={data.transactions.data} />
        </Container>
      </>
    );
  }
  if (redirectToLogin) {
    return <Redirect from="/" to="/login" />;
  }
  if (error) {
    return <DisplayError />;
  }
}
