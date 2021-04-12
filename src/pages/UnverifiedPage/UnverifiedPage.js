import { useEffect, useRef, useState } from "react";
import { Button, Container, Toast } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Portal from "../../components/Portal";

import utils from "../../utils";

function UnverifiedPage() {
  const user = utils.firebase.auth().currentUser;

  const [isVerified, setIsVerified] = useState(user.emailVerified);
  useEffect(() => {
    utils.firebase.auth().onAuthStateChanged((user) => {
      if (user.emailVerified) {
        setIsVerified(true);
      }
    });
  }, []);

  const [status, setStatus] = useState(null);

  function sendVerificationEmail() {
    utils.firebase
      .auth()
      .sendSignInLinkToEmail(user.email, {
        url: "localhost:3000",
        handleCodeInApp: true,
        dynamicLinkDomain: "localhost",
      })
      .then(() =>
        setStatus(`We have just sent verification email to ${user.email}`)
      )
      .catch(console.log);
  }

  return isVerified ? (
    <Redirect to="/ideas" />
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
      <p className="text-center">
        You have't verified your email, please verify your email and get back
        here. We sent the verification link to {user.email}. If you don't find
        it in the inbox folder, try checking your spam folder too. Thank you :)
      </p>
      <hr />
      <p className="text-center">
        If you still don't find the verification email, you can
      </p>
      <Button variant="primary" onClick={sendVerificationEmail}>
        Resend verification email
      </Button>
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

export default UnverifiedPage;
