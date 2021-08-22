import React from "react";
import useStyles from "./style";
import Typography from "@material-ui/core/Typography";
import Formatter from "../../../helper/currencyFormatter";
import { Box, Link } from "@material-ui/core";
export default function Expense({ expenses }) {
  const classes = useStyles();
  const amount = Formatter.format(expenses);
  return (
    <Box
      className={classes.box}
      py={3}
      px={2}
      boxShadow={3}
      borderRadius={8}
      textAlign="center"
      my={2}
    >
      <Typography variant="h4" color="initial">
        Expense
      </Typography>
      <Typography variant="h3" color="initial">
        - {amount}
      </Typography>
      {expenses ? (
        <Typography variant="body1" color="initial">
          You've spent {amount} this month.{" "}
          <Link href="#" underline="always" className={classes.link}>
            Have you spent even more? Add it here
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1" color="initial">
          You haven't spent anything this month.{" "}
          <Link href="#" underline="always" className={classes.link}>
            Am i wrong? Well add your expenses here
          </Link>
        </Typography>
      )}
    </Box>
  );
}
