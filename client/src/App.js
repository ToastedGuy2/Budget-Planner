import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authApiUrl } from "./apiUrls";
import axios from "axios";
import Main from "./Components/Main/Main.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import Login from "./Components/Login/Login.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { config } from "dotenv";
import "@fontsource/roboto";
export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const login = async (credentials) => {
    const response = await axios.post(authApiUrl, credentials);
    const { jwt, user } = response.data.data;
    localStorage.setItem("token", jwt);
    setLoggedInUser(user);
  };
  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(authApiUrl, {
          headers: {
            Authorization: token,
          },
        });
        const user = response.data.data.user;
        setLoggedInUser(user);
        return true;
      }
      return false;
    } catch (error) {
      const { data, status, headers } = error.response;
      if (error.response) {
        if (status === 401) {
          return false;
        }
      }
      throw error;
    }
  };

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Main user={loggedInUser} isUserAuthenticated={authenticateUser} />
        </Route>
        <Route path="/signup">
          <SignUp login={login} />
        </Route>
        <Route path="/login">
          <Login login={login} />
        </Route>
      </Switch>
    </Router>
  );
}

// export default App;
