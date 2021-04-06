import { memo, useEffect, useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { Redirect, useParams } from "react-router";

import Navbar from "../../components/Navbar";

import services from "../../services";
import { Link } from "react-router-dom";
import constants from "../../constants";
import IdeaCard from "../../components/IdeaCard/IdeaCard";

import "./ThreadPage.css";

function ThreadPage() {
  const { ideaID } = useParams();

  const [ideas, setIdeas] = useState([]);
  const [focusedIdea, setFocusedIdea] = useState(undefined);
  const [renderedIdeas, setRenderedIdeas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const fetchedFocusedIdea = await services.idea
        .fetchByID(ideaID)
        .catch(setError);

      setFocusedIdea(fetchedFocusedIdea);
      setRenderedIdeas([fetchedFocusedIdea]);
    })();
  }, []);

  useEffect(() => {
    if (focusedIdea) {
      (async () => {
        const fetchedIdeas = await services.idea
          .fetchByThreadIDs(focusedIdea.threadID)
          .catch(setError);

        setIdeas(fetchedIdeas);
      })();
    }
  }, [focusedIdea]);

  function loadPrevious() {
    const [firstIdea] = renderedIdeas;
    const previousIdea = ideas.find((data) => data.id === firstIdea.repliedID);
    setRenderedIdeas([previousIdea, ...renderedIdeas]);
  }

  function loadNext() {
    const lastIdea = renderedIdeas[renderedIdeas.length - 1];
    const nextIdea = ideas.find(({ repliedID, isFirstReply }) => repliedID === lastIdea.id && isFirstReply); // prettier-ignore
    setRenderedIdeas([...renderedIdeas, nextIdea]);
  }

  function isFirst(index) {
    return index === 0;
  }

  function isLast(index, array) {
    return index === array.length - 1;
  }

  function hasRepliedIdea(idea) {
    return !!idea.repliedID;
  }

  function hasReply(idea) {
    return idea.repliesCount > 0;
  }

  if (error) {
    return <Redirect to="/error" />;
  }

  return (
    <Container>
      <Row style={{ maxWidth: "500px", margin: "0px auto" }}>
        <Navbar />
        {renderedIdeas.map((idea, i, ideas) => (
          <div key={idea.id} style={{ padding: "0px" }}>
            <PrevButton
              onClick={loadPrevious}
              show={hasRepliedIdea(idea) && isFirst(i)}
            />
            <Link
              to={idea.id === ideaID ? "" : `/ideas/${idea.id}`}
              style={styles.link}>
              <IdeaCard idea={idea} />
            </Link>
            <NextButton
              onClick={loadNext}
              show={hasReply(idea) && isLast(i, ideas)}
              showConnector={!isLast(i, ideas)}
            />
          </div>
        ))}
      </Row>
    </Container>
  );
}

function PrevButton({ onClick, show }) {
  return (
    show && (
      <div className="d-flex flex-column align-items-center">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Load previous</Tooltip>}>
          <i
            className="bi bi-arrow-up-circle-fill fs-3 btn--rounded"
            style={styles.roundedButton}
            onClick={onClick}
          />
        </OverlayTrigger>
        <div style={styles.line} className="btn--rounded" />
      </div>
    )
  );
}

function NextButton({ onClick, show, showConnector }) {
  return show ? (
    <div className="d-flex flex-column align-items-center">
      <div style={styles.line} className="btn--rounded" />
      <OverlayTrigger placement="top" overlay={<Tooltip>Load next</Tooltip>}>
        <i
          className="bi bi-arrow-down-circle-fill fs-3 btn--rounded"
          style={styles.roundedButton}
          onClick={onClick}
        />
      </OverlayTrigger>
    </div>
  ) : showConnector ? (
    <div className="d-flex flex-column align-items-center">
      <div style={styles.line} className="btn--rounded" />
    </div>
  ) : null;
}

const styles = {
  link: {
    textDecoration: "none",
    padding: "0px",
    color: constants.TEXT_COLOR,
  },
  line: {
    width: "4px",
    height: "16px",
    backgroundColor: constants.TEXT_TERTIARY_COLOR,
  },
  roundedButton: {
    height: "28px",
    width: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

export default memo(ThreadPage);
