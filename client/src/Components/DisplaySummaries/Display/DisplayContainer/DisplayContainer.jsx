import { Box } from "@material-ui/core";
import React from "react";
import useStyles from "./style";
import Typography from "@material-ui/core/Typography";

export default function DisplayContainer({
  title,
  amount,
  message,
  children,
  bgColor,
}) {
  const classes = useStyles();
  return (
    <Box
      className={classes.box}
      py={2}
      px={2}
      boxShadow={3}
      borderRadius={8}
      textAlign="center"
      style={{ backgroundColor: bgColor }}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h3">{amount}</Typography>
      <Typography variant="body1">{message}</Typography>
      {children}
    </Box>
  );
}
