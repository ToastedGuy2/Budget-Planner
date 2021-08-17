import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import useStyles from "./style";
export default function Navbar({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            style={{ marginLeft: 10 }}
            className={classes.brand}
          >
            Budget Planner
          </Typography>
        </Box>
        <IconButton onClick={handleClick}>
          <Avatar className={classes.profile}>
            {user.email.substring(0, 2).toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
