import React from "react";
import Grid from "@material-ui/core/Grid";
import DisplayBudget from "./Display/DisplayBudget.jsx";
import DisplayIncome from "./Display/DisplayIncome.jsx";
import DisplayExpenses from "./Display/DisplayExpenses.jsx";
export default function DisplaySummaries() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DisplayBudget budget={0} remainBudget={0} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DisplayIncome amount={0} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DisplayExpenses amount={0} />
      </Grid>
    </Grid>
  );
}
