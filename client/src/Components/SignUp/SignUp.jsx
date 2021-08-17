import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CenterContainer from "../CenterContainer";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import useStyles from "./style.js";
import * as Validator from "validatorjs";
import axios from "axios";
import { userApiUrl } from "../../apiUrls.js";
import { Redirect } from "react-router-dom";
const defaultInput = {
  value: "",
  error: {
    display: false,
    message: "",
  },
};
export default function SignUp({ login }) {
  const [emailInput, setEmailInput] = useState(defaultInput);
  const [passwordInput, setPasswordInput] = useState(defaultInput);
  const [repeatPasswordInput, setRepeatPasswordInput] = useState(defaultInput);
  const [alertError, setAlertError] = useState({ display: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (loading) {
      const authNewUser = async () => {
        try {
          await axios.get(`${userApiUrl}/${emailInput.value}`);
          setEmailInput({
            ...emailInput,
            error: {
              display: true,
              message: "Email has already been taken",
            },
          });
        } catch (error) {
          const { status, data } = error.response;
          if (error.response) {
            if (status === 404) {
              try {
                const user = {
                  email: emailInput.value,
                  password: passwordInput.value,
                  repeat_password: repeatPasswordInput.value,
                };
                await axios.post(userApiUrl, user);
                await login(user);
                setComplete(true);
              } catch (error) {
                if (error.response) {
                  displayAlertError(error.response.data.message);
                } else {
                  displayAlertError(
                    "Oops something went wrong. Please try again"
                  );
                }
              }
            }
            if (status === 500) {
              displayAlertError(data.message);
            }
          } else {
            displayAlertError("Oops something went wrong. Please try again");
          }
        } finally {
          setLoading(false);
        }
      };
      authNewUser();
    }
  }, [loading]);
  const displayAlertError = (message) => {
    setAlertError({ display: true, message });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const applySyncValidation = () => {
      const inputs = {
        email: emailInput.value,
        password: passwordInput.value,
        repeat_password: repeatPasswordInput.value,
      };
      let rules = {
        email: "required|email",
        password: "required",
        repeat_password: "required|same:password",
      };
      let validation = new Validator(inputs, rules, {
        same: "Passwords do not match",
        required: "This field is required",
      });
      const clearInputErrors = () => {
        const error = {
          display: false,
          message: "",
        };
        setEmailInput({ value: emailInput.value, error });
        setPasswordInput({ value: passwordInput.value, error });
        setRepeatPasswordInput({ value: repeatPasswordInput.value, error });
      };
      clearInputErrors();
      if (validation.passes()) {
        setLoading(true);
      } else {
        if (validation.errors.has("email")) {
          setEmailInput({
            value: emailInput.value,
            error: {
              display: true,
              message: validation.errors.get("email"),
            },
          });
        }
        if (validation.errors.has("password")) {
          setPasswordInput({
            value: passwordInput.value,
            error: {
              display: true,
              message: validation.errors.get("password"),
            },
          });
        }
        if (validation.errors.has("repeat_password")) {
          setRepeatPasswordInput({
            value: repeatPasswordInput.value,
            error: {
              display: true,
              message: validation.errors.get("repeat_password"),
            },
          });
        }
      }
    };
    applySyncValidation();
  };
  const classes = useStyles();
  if (complete) {
    return <Redirect to="/" />;
  }
  return (
    <CenterContainer>
      <Container component="main" maxWidth="xs">
        <form noValidate onSubmit={onSubmitHandler} className={classes.form}>
          <Box className={classes.box}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
          </Box>
          <Collapse in={alertError.display}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setAlertError(false);
              }}
            >
              {alertError.message}
            </Alert>
          </Collapse>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            margin="normal"
            value={emailInput.value}
            onChange={(e) => {
              setEmailInput({ ...emailInput, value: e.target.value });
            }}
            autoFocus
            error={emailInput.error.display}
            helperText={emailInput.error.message}
          />
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
            value={passwordInput.value}
            onChange={(e) => {
              setPasswordInput({ ...passwordInput, value: e.target.value });
            }}
            error={passwordInput.error.display}
            helperText={passwordInput.error.message}
          />
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
            value={repeatPasswordInput.value}
            onChange={(e) => {
              setRepeatPasswordInput({
                ...repeatPasswordInput,
                value: e.target.value,
              });
            }}
            error={repeatPasswordInput.error.display}
            helperText={repeatPasswordInput.error.message}
          />

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              disabled={loading}
            >
              Sign up
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                color="primary"
                className={classes.progressClass}
              />
            )}
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                color="primary"
              >
                Already have an account? Login here
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </CenterContainer>
  );
}
