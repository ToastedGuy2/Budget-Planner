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
const bgColor = "#00b7ff";
const bgImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='540' height='450' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E")`;
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
    <CenterContainer bgColor={bgColor} bgImage={bgImage}>
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
