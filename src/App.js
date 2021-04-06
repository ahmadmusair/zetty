import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages";

import { StoreCtx, mainReducer } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [store, dispatch] = useReducer(
    mainReducer,
    mainReducer({ idea: undefined }, { type: undefined })
  );

  return (
    <StoreCtx.Provider value={[store, dispatch]}>
      <Router>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </Router>
    </StoreCtx.Provider>
  );
}

export default App;
