import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
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
export default function SignUp({ login }) {
  const [user, setUser] = useState({
    email: "bar2@bar2.com",
    password: "bar2",
    repeat_password: "bar2",
  });
  const [inputError, setInputErrors] = useState({
    email: {
      error: false,
      helperText: "",
    },
    password: {
      error: false,
      helperText: "",
    },
    repeat_password: {
      error: false,
      helperText: "",
    },
  });
  const [alertError, setAlertError] = useState({ display: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (loading) {
      const authNewUser = async () => {
        try {
          await axios.get(`${userApiUrl}/${user.email}`);
          setInputErrors({
            ...inputError,
            email: { error: true, helperText: "Email has already been taken" },
          });
          setLoading(false);
        } catch (error) {
          const { status, data } = error.response;
          if (error.response) {
            if (status === 404) {
              try {
                const { data } = await axios.post(userApiUrl, user);
                data.password = user.password;
                await login(data);
                setLoading(false);
                setComplete(true);
              } catch (error) {
                const { status, data } = error.response;
                if (error.response) {
                  setAlertError(data.message);
                }
              }
            }
            if (status === 500) {
              setAlertError(data.message);
            }
          } else {
            displayAlertError(
              "Something went wrong while processing your request. Please try again"
            );
          }
        }
      };
      authNewUser();
    }
  }, [loading]);
  const displayAlertError = (message) => {
    setAlertError({ display: true, message });
    setLoading(false);
  };
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
    setInputErrors({
      email: {
        error: false,
        helperText: "",
      },
      password: {
        error: false,
        helperText: "",
      },
      repeat_password: {
        error: false,
        helperText: "",
      },
    });
    if (validation.passes()) {
      setLoading(true);
    } else {
      // Synchronous validation fails
      if (validation.errors.has("email")) {
        setInputErrors((currentState) => ({
          ...currentState,
          email: {
            error: true,
            helperText: validation.errors.first("email"),
          },
        }));
      }
      if (validation.errors.has("password")) {
        setInputErrors((currentState) => ({
          ...currentState,
          password: {
            error: true,
            helperText: validation.errors.first("password"),
          },
        }));
      }
      if (validation.errors.has("repeat_password")) {
        setInputErrors((currentState) => ({
          ...currentState,
          repeat_password: {
            error: true,
            helperText: validation.errors.first("repeat_password"),
          },
        }));
      }
    }
  };
  const classes = useStyles();
  if (complete) {
    return <Redirect to="/" />;
  }
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
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            autoFocus
            error={inputError.email.error}
            helperText={inputError.email.helperText}
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
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            error={inputError.password.error}
            helperText={inputError.password.helperText}
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
            value={user.repeat_password}
            onChange={(e) =>
              setUser({ ...user, repeat_password: e.target.value })
            }
            error={inputError.repeat_password.error}
            helperText={inputError.repeat_password.helperText}
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
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </CenterContainer>
  );
}
