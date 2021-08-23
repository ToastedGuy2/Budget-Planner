import React from "react";
import useStyles from "./style";
import Typography from "@material-ui/core/Typography";
import Formatter from "../../../helper/currencyFormatter";
import TransactionContainer from "../../TransactionContainer/TransactionContainer.jsx";
import { Link } from "@material-ui/core";
export default function Expense({ amount }) {
  const classes = useStyles();
  const formattedAmount = Formatter.format(amount);
  //
  const message = amount
    ? `You've spent ${formattedAmount} this month.`
    : `You haven't spent anything this month.`;
  return (
    <TransactionContainer
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
    </TransactionContainer>
  );
}
