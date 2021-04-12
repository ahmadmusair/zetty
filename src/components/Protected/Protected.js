import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import utils from "../../utils";

import Loading from "../Loading";

function Protected(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  useEffect(() => {
    utils.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  switch (true) {
    case isAuthenticated === undefined:
      return <Loading />;
    case isAuthenticated === false:
      return <Redirect to={props.notAuthenticatedPath} />;
    case isAuthenticated:
      return props.children;
    default:
      return <Redirect to="/error" />;
  }
}

export default Protected;
