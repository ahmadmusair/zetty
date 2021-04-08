import { memo } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

function ErrorPage(props) {
  return (
    <Container>
      <Row style={styles.row}>
        <Navbar />
        <h1 style={{ textAlign: "center" }}>Something went wrong!</h1>
        <ErrorMessage error={props.error} />
        <p style={{ textAlign: "center" }}>
          It's ok, you can go back to <Link to="/ideas">home page</Link>
        </p>
      </Row>
    </Container>
  );
}

function ErrorMessage(props) {
  return props.error ? (
    <div className="alert alert-warning">{JSON.stringify(props.error)}</div>
  ) : null;
}

const styles = {
  row: {
    maxWidth: "500px",
    margin: "0px auto",
    display: "flex",
    flexDirectin: "row",
    alignItems: "center",
  },
};

export default memo(ErrorPage);
