import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";

import { StoreCtx, mainReducer } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Protected from "./components/Protected/Protected";

function App() {
  const [store, dispatch] = useReducer(
    mainReducer,
    mainReducer({ idea: undefined }, { type: undefined })
  );

  return (
    <StoreCtx.Provider value={[store, dispatch]}>
      <Helmet>
        <title>Zetty: Your Smart Note-Taking App</title>
      </Helmet>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/ideas">
            <Protected notAuthenticatedPath="/login">
              <HomePage />
            </Protected>
          </Route>
          <Route path="/ideas/:ideaID">
            <Protected notAuthenticatedPath="/login">
              <ThreadPage />
            </Protected>
          </Route>
          <Route path="/error">
            <ErrorPage />
          </Route>
          <Route path="/">
            <Redirect to="/ideas" />
          </Route>
        </Switch>
      </Router>
    </StoreCtx.Provider>
  );
}

export default App;
