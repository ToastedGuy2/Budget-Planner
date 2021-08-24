import React from "react";
import useStyles from "./DisplayContainer/style";
import Typography from "@material-ui/core/Typography";
import Formatter from "../../../helper/currencyFormatter";
import DisplayContainer from "./DisplayContainer/DisplayContainer.jsx";
import { Link } from "@material-ui/core";
export default function DisplayExpenses({ amount }) {
  const classes = useStyles();
  const formattedAmount = Formatter.format(amount);
  //
  const message = amount
    ? `You've spent ${formattedAmount} this month.`
    : `You haven't spent anything this month.`;
  return (
    <DisplayContainer
      title="Expenses"
      amount={formattedAmount}
      message={message}
      bgColor="#d32f2f"
    >
      <Typography variant="body1">
        {amount ? (
          <Link href="#" underline="always" className={classes.link}>
            Have you spent even more? Add it here
          </Link>
        ) : (
          <Link href="#" underline="always" className={classes.link}>
            Add your expenses here
          </Link>
        )}
      </Typography>
    </DisplayContainer>
  );
}
