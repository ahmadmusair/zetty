import React, { useState, useEffect } from "react";
import { Badge, Button, Card as NCard } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import constants from "../../constants";
import services from "../../services";
import utils from "../../utils";

import IdeaModal from "../IdeaModal";
import Loading from "../Loading";

function IdeaCard({ idea: initialIdea }) {
  const [idea, setIdea] = useState(initialIdea);
  const [isError, setIsError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const formattedDate = getFormattedDate(idea);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = services.idea.getSnapshot(initialIdea.id).onSnapshot(
      (doc) => setIdea({ ...doc.data(), id: doc.id }),
      (err) => setIsError(err)
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
      setIsError(error);
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

  return isError ? (
    <Redirect to="/error" error={isError} />
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
      className="p-0 d-flex align-row align-items-center"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Create response">
      <i className="bi bi-chat-right-fill fs-4 btn--rounded btn--black" />
      <Badge variant="secondary" className="text-primary">
        {props.count}
      </Badge>
    </Button>
  );
}

function EditButton(props) {
  return (
    <Button
      onClick={props.onClick}
      variant="transparent"
      className="p-0"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Edit idea">
      <i className="bi bi-pen-fill btn--rounded btn--black fs-4" />
    </Button>
  );
}

const styles = {
  subtitle: { fontSize: "0.75rem", color: constants.TEXT_TERTIARY_COLOR },
  card: { borderRadius: "16px", overflow: "hidden", width: "100%" },
  link: {
    textDecoration: "none",
    padding: "0px",
    color: constants.TEXT_COLOR,
  },
};

export default IdeaCard;
