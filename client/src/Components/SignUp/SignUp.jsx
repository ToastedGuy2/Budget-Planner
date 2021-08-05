import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CenterContainer from "../CenterContainer";
import useStyles from "./style.js";
import * as Validator from "validatorjs";
export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });
  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const [repeatPasswordError, setRepeatPasswordError] = useState({
    error: false,
    helperText: "",
  });
  // TODO: The password confirmation field is required.
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let rules = {
      email: "required|email",
      password: "required",
      repeat_password: "required|same:password",
    };
    let validation = new Validator(user, rules, {
      same: "Passwords do not match",
      required: "This field is required",
    });
    if (validation.fails()) {
      if (validation.errors.has("email")) {
        setEmailError({
          error: true,
          helperText: validation.errors.first("email"),
        });
      } else {
        setEmailError({
          error: false,
          helperText: "",
        });
      }
      if (validation.errors.has("password")) {
        setPasswordError({
          error: true,
          helperText: validation.errors.first("password"),
        });
      } else {
        setPasswordError({
          error: false,
          helperText: "",
        });
      }
      if (validation.errors.has("repeat_password")) {
        setRepeatPasswordError({
          error: true,
          helperText: validation.errors.first("repeat_password"),
        });
      } else {
        setRepeatPasswordError({
          error: false,
          helperText: "",
        });
      }
    } else {
      setEmailError({ ...emailError, error: false });
      setPasswordError({ ...passwordError, error: false });
      setRepeatPasswordError({
        ...repeatPasswordError,
        error: false,
      });
      alert("Everything is alright");
    }
  };
  const classes = useStyles();
  return (
    <CenterContainer>
      <Container component="main" maxWidth="xs">
        <Box className={classes.box}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
        </Box>
        <form noValidate onSubmit={onSubmitHandler}>
          {emailError.error ? (
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              margin="normal"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              autoFocus
              error
              helperText={emailError.helperText}
            />
          ) : (
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              margin="normal"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              autoFocus
            />
          )}
          {passwordError.error ? (
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              margin="normal"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              error
              helperText={passwordError.helperText}
            />
          ) : (
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              margin="normal"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          )}
          {repeatPasswordError.error ? (
            <TextField
              variant="outlined"
              required
              fullWidth
              name="repeat_password"
              label="Repeat password"
              type="password"
              id="repeat_password"
              autoComplete="repeat_password"
              margin="normal"
              value={user.repeat_password}
              onChange={(e) =>
                setUser({ ...user, repeat_password: e.target.value })
              }
              error
              helperText={repeatPasswordError.helperText}
            />
          ) : (
            <TextField
              variant="outlined"
              required
              fullWidth
              name="repeat_password"
              label="Repeat password"
              type="password"
              id="repeat_password"
              autoComplete="repeat_password"
              margin="normal"
              value={user.repeat_password}
              onChange={(e) =>
                setUser({ ...user, repeat_password: e.target.value })
              }
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitBtn}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

        {/* <Box mt={5}>
          <Copyright />
        </Box> */}
      </Container>
    </CenterContainer>
  );
}
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
