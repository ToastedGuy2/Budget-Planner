import React from "react";
import useStyles from "./DisplayContainer/style";
import Typography from "@material-ui/core/Typography";
import Formatter from "../../../helper/currencyFormatter";
import { Link } from "@material-ui/core";
import DisplayContainer from "./DisplayContainer/DisplayContainer.jsx";
export default function DisplayIncome({ amount }) {
  const classes = useStyles();
  const formattedIncome = Formatter.format(amount);
  const message = amount
    ? `You've earned ${formattedIncome} this month.`
    : `You've earned nothing this month.`;
  return (
    <DisplayContainer
      title="Income"
      amount={formattedIncome}
      message={message}
      bgColor="#4caf50"
    >
      <Typography variant="body1">
        {amount ? (
          <Link href="#" underline="always" className={classes.link}>
            Have you earned even more? Well add it here
          </Link>
        ) : (
          <Link href="#" underline="always" className={classes.link}>
            Add your income sources here
          </Link>
        )}
      </Typography>
    </DisplayContainer>
  );
}
