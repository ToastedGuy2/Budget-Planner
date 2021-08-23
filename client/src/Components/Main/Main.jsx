import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Container, Grid } from "@material-ui/core";
import Budget from "../Budget/Budget.jsx";
import TransactionTable from "../TransactionTable/TransactionTable.jsx";
import Income from "../Transaction/Income/Income.jsx";
import Expense from "../Transaction/Expense/Expense.jsx";
import useStyles from "./style.js";
export default function Main({ user }) {
  const classes = useStyles();
  return (
    <>
      <Navbar user={user} />
      <Container
        maxWidth="lg"
        className={classes.container}
        style={{ marginTop: 16 }}
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12}>
            <Budget budget={0} remainBudget={0} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Income amount={0}></Income>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Expense amount={0}></Expense>
          </Grid>
        </Grid>
        <TransactionTable />
      </Container>
    </>
  );
}
