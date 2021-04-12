import { useEffect, useReducer, useState } from "react";
import { Container, Form, Button, Image, Toast } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import services from "../../services";
import utils from "../../utils";

import Portal from "../../components/Portal";
import Loading from "../../components/Loading";

function SignUpPage() {
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, togglePasswordVisibility] = useReducer(
    (v) => !v,
    false
  );
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function signUp() {
    setIsLoading(true);
    services.user
      .signup({ email, password })
      .then(() =>
        setStatus(
          `Successfull!, please click verification link we have just sent to ${email}`
        )
      )
      .catch((err) => setStatus(err.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (user && user.emailVerified) {
      history.push("/ideas");
    } else {
      setIsLoading(true);
      utils.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }

        setIsLoading(false);
      });
    }
  }, [user]);

  return isLoading ? (
    <Loading />
  ) : (
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
      <h1 className="mb-2 mt-2">Signup</h1>
      <h2 className="text-muted fs-5 mb-4">Sign up to create account</h2>
      <Form>
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
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
          className="w-100 mt-2 mb-4"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            signUp();
          }}>
          Sign Up
        </Button>
      </Form>
      <p className="text-sm-center mt-4">
        Already have an account?{" "}
        <span>
          <Link to="/login">login here</Link>
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

export default SignUpPage;
