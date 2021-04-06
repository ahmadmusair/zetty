import { memo } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

function ErrorPage() {
  return (
    <Container>
      <Row style={{ maxWidth: "500px", margin: "0px auto" }}>
        <Navbar />
        <h1 style={{ textAlign: "center" }}>
          Something went wrong! please go back to <Link to="/">home page</Link>
        </h1>
      </Row>
    </Container>
  );
}

function byCreatedTime(firstIdea, secondIdea) {
  return secondIdea.createdTime - firstIdea.createdTime;
}

export default memo(ErrorPage);
