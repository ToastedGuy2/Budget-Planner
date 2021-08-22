import React from "react";
import { Container, Grid } from "@material-ui/core";
import Income from "./Income/Income.jsx";
import Expense from "./Expense/Expense.jsx";
export default function Transaction() {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Income income={0}></Income>
      </Grid>
      <Grid item md={6}>
        <Expense expenses={0}></Expense>
      </Grid>
    </Grid>
  );
}
