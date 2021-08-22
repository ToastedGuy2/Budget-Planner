import React from "react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Formatter from "../../helper/currencyFormatter";
import useStyles from "./style";
import { Link } from "@material-ui/core";
export default function Budget({ remainBudget, budget }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.box}
      py={3}
      boxShadow={3}
      borderRadius={8}
      textAlign="center"
      my={2}
    >
      <Typography variant="h4" color="initial">
        Budget
      </Typography>
      <Typography variant="h3">
        {budget ? Formatter.format(remainBudget) : "NONE"}
      </Typography>
      {budget ? (
        <>
          <Typography variant="body1">
            You have {Formatter.format(remainBudget)} budget left. Your original
            budget was {Formatter.format(budget)}.
          </Typography>
        </>
      ) : (
        <Typography variant="body1">
          You currently don't have a budget. Please add one by pressing{" "}
          <Link href="#" className={classes.link} underline="always">
            Add Budget
          </Link>
        </Typography>
      )}
    </Box>
  );
}
