import { Container, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Container style={styles.container}>
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
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button className="w-100 mt-2 mb-4" variant="primary" type="submit">
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
