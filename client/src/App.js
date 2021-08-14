import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authApiUrl } from "./apiUrls";
import axios from "axios";
import Main from "./Components/Main/Main.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
export default function App() {
  const [user, setUser] = useState(null);
  const login = async (credentials) => {
    await axios.post(authApiUrl, credentials);
    setUser(credentials);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main user={user} />
        </Route>
        <Route path="/signup">
          <SignUp login={login} />
        </Route>
      </Switch>
    </Router>
  );
}
