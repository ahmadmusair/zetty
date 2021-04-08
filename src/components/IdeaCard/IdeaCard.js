import React, { useState, useEffect } from "react";
import { Badge, Button, Card as NCard } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";

import constants from "../../constants";
import services from "../../services";
import { useStore } from "../../store";
import { starIdea, unstarIdea } from "../../store/idea.actions";
import utils from "../../utils";

import IdeaModal from "../IdeaModal";
import Loading from "../Loading";

function IdeaCard({ idea: initialIdea }) {
  const [_, dispatch] = useStore();

  const [idea, setIdea] = useState(initialIdea);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const formattedDate = getFormattedDate(idea);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = services.idea.getSnapshot(initialIdea.id).onSnapshot(
      (doc) => setIdea({ ...doc.data(), id: doc.id }),
      (err) => setError(err)
    );
    setIsLoading(false);
    return () => unsubscribe();
  }, []);

  function getFormattedDate(idea) {
    let formattedDate = null;

    try {
      formattedDate = utils.dateFns.format(
        utils.dateFns.fromUnixTime(idea.createdTime),
        constants.DEFAULT_DATE_FORMAT
      );
    } catch (error) {
      setError(error);
    }

    return formattedDate;
  }

  const [modal, setModal] = useState({
    mode: "CREATE",
    isVisible: false,
    idea,
  });

  function showUpdateModal(e) {
    e.stopPropagation();
    setModal({
      ...modal,
      mode: "UPDATE",
      isVisible: true,
      idea,
    });
  }

  function showResponseModal(e) {
    e.stopPropagation();
    setModal({
      ...modal,
      mode: "RESPONSE",
      isVisible: true,
      idea,
    });
  }

  function hideModal() {
    setModal({ ...modal, idea: undefined, isVisible: false });
  }

  function toggleStarred(idea) {
    if (idea.isStarred) {
      _unstarIdea(idea);
    } else {
      _starIdea(idea);
    }
  }

  function _starIdea(idea) {
    return (e) => {
      e.stopPropagation();
      services.idea.star(idea);
      dispatch(starIdea(idea));
    };
  }

  function _unstarIdea(idea) {
    return (e) => {
      e.stopPropagation();
      services.idea.unstar(idea);
      dispatch(unstarIdea(idea));
    };
  }

  return error ? (
    <Redirect to="/error" error={error} />
  ) : isLoading || !initialIdea ? (
    <Loading />
  ) : (
    <NCard key={idea.id} className="p-0" style={styles.card}>
      <Link to={`/ideas/${idea.id}`} style={styles.link}>
        <NCard.Body className="p-4 cursor-pointer">
          <NCard.Title>{idea.title}</NCard.Title>
          <NCard.Subtitle style={styles.subtitle}>
            {formattedDate}{" "}
            {idea.repliedID && `- Response to: #${idea.repliedID}`}
          </NCard.Subtitle>
          <NCard.Text className="mt-4">{idea.description}</NCard.Text>
        </NCard.Body>
      </Link>

      <NCard.Footer className="d-flex flex-row justify-content-between ps-4 pr-4">
        <ReplyButton onClick={showResponseModal} count={idea.repliesCount} />
        <EditButton onClick={showUpdateModal} />
        <StarButton onClick={toggleStarred} isStarred={idea.isStarred} />
      </NCard.Footer>

      <IdeaModal {...modal} hideModal={hideModal} />
    </NCard>
  );
}

function ReplyButton(props) {
  return (
    <Button
      onClick={props.onClick}
      variant="transparent"
      className="p-0 d-flex align-row align-items-center">
      <i className="bi bi-chat-square-text fs-4" />
      <Badge variant="secondary" className="text-primary">
        {props.count}
      </Badge>
    </Button>
  );
}

function EditButton(props) {
  return (
    <Button onClick={props.onClick} variant="transparent" className="p-0">
      <i className="bi bi-pen fs-4" />
    </Button>
  );
}

function StarButton(props) {
  return (
    <Button onClick={props.onClick} variant="transparent" className="p-0">
      <i
        className={getClassName(props.isStarred)}
        style={getColor(props.isStarred)}
      />
    </Button>
  );
}

function getClassName(isStarred) {
  return isStarred ? "bi bi-star-fill fs-4" : "bi bi-star fs-4";
}

function getColor(isStarred) {
  return {
    color: isStarred ? constants.PRIMARY_COLOR : constants.TEXT_COLOR,
  };
}

const styles = {
  subtitle: { fontSize: "0.75rem", color: constants.TEXT_TERTIARY_COLOR },
  card: { borderRadius: "16px", overflow: "hidden" },
  link: {
    textDecoration: "none",
    padding: "0px",
    color: constants.TEXT_COLOR,
  },
};

export default IdeaCard;
