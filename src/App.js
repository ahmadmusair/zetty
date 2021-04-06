import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";

import { StoreCtx, mainReducer } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const [store, dispatch] = useReducer(
    mainReducer,
    mainReducer({ idea: undefined }, { type: undefined })
  );

  return (
    <StoreCtx.Provider value={[store, dispatch]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          </Route>
          <Route path="/ideas/:ideaID">
            <ErrorBoundary>
              <ThreadPage />
            </ErrorBoundary>
          </Route>
          <Route path="/error">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </StoreCtx.Provider>
  );
}

export default App;
