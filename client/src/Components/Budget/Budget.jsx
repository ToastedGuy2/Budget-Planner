import React from "react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Formatter from "../../helper/currencyFormatter";
import useStyles from "./style";
import { Link } from "@material-ui/core";
import TransactionContainer from "../TransactionContainer/TransactionContainer.jsx";
const getBgColor = (budget, remainBudget) => {
  if (!budget) return "#008ed5";
  if (remainBudget >= budget * 0.8) return "#1CB050";
  if (remainBudget >= budget * 0.6) return "#55B475";
  if (remainBudget >= budget * 0.4) return "#FFAE03";
  if (remainBudget >= budget * 0.2) return "#CD5334";
  if (remainBudget >= 0) return "#CC2B28";
  return "#1D201F";
};
const getStatusMessage = (budget, remainBudget) => {
  if (!budget) return "You have not select a budget.";
  if (remainBudget > 0)
    return `You have ${Formatter.format(remainBudget)} budget left. Your budget
  was originally ${Formatter.format(budget)}.`;
  return `There is nothing left. You have exceed your budget by ${
    remainBudget * -1
  }`;
};

export default function Budget({ remainBudget, budget }) {
  const classes = useStyles();
  const message = getStatusMessage(budget, remainBudget);
  return (
    <TransactionContainer
      title="Budget"
      amount={Formatter.format(remainBudget)}
      message={message}
      bgColor={getBgColor(budget, remainBudget)}
    >
      <Typography variant="body1">
        {budget ? (
          <>
            Click here to{" "}
            <Link href="#" underline="always" className={classes.link}>
              Edit
            </Link>{" "}
            or{" "}
            <Link href="#" underline="always" className={classes.link}>
              Delete
            </Link>{" "}
            your budget
          </>
        ) : (
          <Link href="#" className={classes.link} underline="always">
            Add your budget here
          </Link>
        )}
      </Typography>
    </TransactionContainer>
  );
}
