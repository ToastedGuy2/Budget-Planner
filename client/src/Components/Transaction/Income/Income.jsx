import React from "react";
import useStyles from "./style";
import Typography from "@material-ui/core/Typography";
import Formatter from "../../../helper/currencyFormatter";
import { Box, Link } from "@material-ui/core";
export default function Income({ income }) {
  const classes = useStyles();
  const formattedIncome = Formatter.format(income);
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
        Income
      </Typography>
      <Typography variant="h3" color="initial">
        + {formattedIncome}
      </Typography>
      {income ? (
        <Typography variant="body1" color="initial">
          You've earned {formattedIncome} this month.{" "}
          <Link href="#" underline="always" className={classes.link}>
            Have you earned even more? Well add it here
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1" color="initial">
          You've earned nothing this month.{" "}
          <Link href="#" underline="always" className={classes.link}>
            Am i wrong? Well add your income here
          </Link>
        </Typography>
      )}
    </Box>
  );
}
