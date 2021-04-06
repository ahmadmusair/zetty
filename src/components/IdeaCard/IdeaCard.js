import React, { useState, memo } from "react";
import { Badge, Button, Card as NCard } from "react-bootstrap";
import { Link } from "react-router-dom";

import constants from "../../constants";
import services from "../../services";
import { useStore } from "../../store";
import { starIdea, unstarIdea } from "../../store/idea.actions";
import utils from "../../utils";

import IdeaModal from "../IdeaModal";

function IdeaCard({ idea }) {
  const [_, dispatch] = useStore();

  const formattedDate = utils.dateFns.format(
    utils.dateFns.fromUnixTime(idea.createdTime),
    constants.DEFAULT_DATE_FORMAT
  );

  const [modal, setModal] = useState({
    mode: "CREATE",
    initialValue: idea,
    isVisible: false,
  });

  function showUpdateModal(e) {
    e.stopPropagation();
    setModal({
      ...modal,
      mode: "UPDATE",
      isVisible: true,
      initialValue: idea,
    });
  }

  function showResponseModal(e) {
    e.stopPropagation();
    setModal({
      ...modal,
      mode: "RESPONSE",
      isVisible: true,
      initialValue: idea,
    });
  }

  function hideModal() {
    setModal({ ...modal, initialValue: undefined, isVisible: false });
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

  function getClassName(idea) {
    return idea.isStarred ? "bi bi-star-fill fs-4" : "bi bi-star fs-4";
  }

  function getColor(idea) {
    return {
      color: idea.isStarred ? constants.PRIMARY_COLOR : constants.TEXT_COLOR,
    };
  }

  return (
    <NCard className="p-0" style={styles.card}>
      <NCard.Body className="p-4 cursor-pointer">
        <Link to={`/ideas/${idea.id}`} style={styles.link}>
          <NCard.Title>{idea.title}</NCard.Title>
          <NCard.Subtitle style={styles.subtitle}>
            {formattedDate}{" "}
            {idea.repliedID && `- Response to: #${idea.repliedID}`}
          </NCard.Subtitle>
          <NCard.Text className="mt-4">{idea.description}</NCard.Text>
        </Link>
      </NCard.Body>

      <NCard.Footer className="d-flex flex-row justify-content-between ps-4 pr-4">
        <Button
          onClick={showResponseModal}
          variant="transparent"
          className="p-0 d-flex align-row align-items-center">
          <i className="bi bi-chat-square-text fs-4" />
          <Badge variant="secondary" className="text-primary">
            {idea.repliesCount}
          </Badge>
        </Button>
        <Button onClick={showUpdateModal} variant="transparent" className="p-0">
          <i className="bi bi-pen fs-4" />
        </Button>
        <Button
          onClick={idea.isStarred ? _unstarIdea(idea) : _starIdea(idea)}
          variant="transparent"
          className="p-0">
          <i className={getClassName(idea)} style={getColor(idea)} />
        </Button>
      </NCard.Footer>

      <IdeaModal
        visible={modal.isVisible}
        initialValue={modal.initialValue}
        mode={modal.mode}
        hideModal={hideModal}
      />
    </NCard>
  );
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

export default memo(IdeaCard);
