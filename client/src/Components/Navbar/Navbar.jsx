import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AvatarIcon from "@material-ui/core/Avatar";
import BarChartIcon from "@material-ui/icons/BarChart";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
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
    <AppBar className={classes.appBar} position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            <Typography variant="h6" className={classes.brand}>
              Budget Planner
            </Typography>
          </Link>
        </Box>
        <Box>
          <IconButton className={classes.icon}>
            <Brightness4Icon fontSize={"large"}></Brightness4Icon>
          </IconButton>
          <IconButton className={classes.icon}>
            <BarChartIcon fontSize="large"></BarChartIcon>
          </IconButton>
          <IconButton>
            {/* <IconButton onClick={handleClick}> */}
            <AvatarIcon className={classes.profile}>
              {user.email.substring(0, 2).toUpperCase()}
            </AvatarIcon>
          </IconButton>
        </Box>
        {/* <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
}
