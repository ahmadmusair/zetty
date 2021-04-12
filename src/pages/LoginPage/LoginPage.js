import { useEffect, useReducer, useState } from "react";
import { Container, Form, Button, Image, Toast } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import utils from "../../utils";
import services from "../../services";

import Portal from "../../components/Portal";

function LoginPage() {
  const history = useHistory();
  const user = utils.firebase.auth().currentUser;

  const [status, setStatus] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, togglePasswordVisibility] = useReducer((v) => !v, false); // prettier-ignore

  function login() {
    services.user
      .login({ email, password })
      .then(() => setStatus("Log in success!"))
      .catch((err) => setStatus(err.message));
  }

  useEffect(() => {
    if (user) {
      history.push("/ideas");
    }
  }, [user]);

  return (
    <Container style={styles.container}>
      <Portal>
        <Toast
          className="mt-4 d-flex position-absolute bg-warning text-light start-50 translate-middle"
          style={{ width: "276px", top: "16px" }}
          show={status}
          onClose={() => setStatus(null)}>
          <Toast.Body>{status}</Toast.Body>
          <button
            type="button"
            class="btn-close me-2 m-auto text-light"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setStatus(null)}
          />
        </Toast>
      </Portal>
      <Image
        className="mb-2"
        rounded
        src="/icons/zetty-logo.svg"
        style={{ width: "50px", height: "50px" }}
      />
      <h1 className="mb-2 mt-2">Login</h1>
      <h2 className="text-muted fs-5 mb-4">Log in to get started</h2>
      <Form>
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type={passwordIsVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            value={passwordIsVisible}
            onClick={togglePasswordVisibility}
          />
        </Form.Group>

        <Button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          className="w-100 mt-2 mb-4"
          variant="primary"
          type="submit">
          Log In
        </Button>
      </Form>
      <p className="text-sm-center mt-4">
        Don't have an account?{" "}
        <span>
          <Link to="/signup">create account</Link>
        </span>
      </p>
    </Container>
  );
}

const styles = {
  container: {
    maxWidth: "300px",
    margin: "0px auto",
    paddingBottom: "128px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default LoginPage;
