import React from "react";
import Grid from "@material-ui/core/Grid";
import DisplayBudget from "./Display/DisplayBudget.jsx";
import DisplayIncome from "./Display/DisplayIncome.jsx";
import DisplayExpenses from "./Display/DisplayExpenses.jsx";
export default function DisplaySummaries({ budget, income, expenses }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DisplayBudget amount={budget.amount} remaining={budget.remaining} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DisplayIncome amount={income.amount} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DisplayExpenses amount={expenses.amount} />
      </Grid>
    </Grid>
  );
}
