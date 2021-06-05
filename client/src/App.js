// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Layout from "./components/dashboard/Layout";
import NotFound from "./components/404/404";
import About from "./components/extra/About/About";
import Contact from "./components/extra/Contact/Contact";
import Tools from "./components/extra/Tools/Tools";
import Landing from "./components/extra/Landing/Landing";

// Style
import "./App.scss";

// Check for token to keep user logged in
if (localStorage.jwtTokenTeams) {
  // Set auth token header auth
  const token = JSON.parse(localStorage.jwtTokenTeams);
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/about" component={About} />
              <PrivateRoute exact path="/contact" component={Contact} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/tools" component={Tools} />
              <PrivateRoute exact path="/dashboard" component={Layout} />
              <Route
                component={localStorage.jwtTokenTeams ? Layout : NotFound}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
