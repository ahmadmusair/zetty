import { memo, useState, useEffect } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { Redirect } from "react-router";
import services from "../../services";

import { useStore } from "../../store";
import {
  storeIdea,
  loadingIdea,
  updateIdea,
  updateManyIdea,
} from "../../store/idea.actions";

function IdeaModal(props) {
  const [_, dispatch] = useStore();
  const [repliedIdea, setRepliedIdea] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (props.mode === "UPDATE" && props.isVisible) {
      setTitle(props.idea.title);
      setDescription(props.idea.description);
    } else if (props.mode === "RESPONSE" && props.isVisible) {
      setRepliedIdea(props.idea);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [props.mode, props.isVisible]);

  function handleSubmit() {
    if (props.mode === "CREATE") {
      _createIdea();
    } else if (props.mode === "UPDATE") {
      _updateIdea();
    } else {
      _createResponse();
    }
    props.hideModal();
  }

  async function _createIdea() {
    dispatch(loadingIdea(true));

    const ideaDraft = {
      userID: 1,
      title,
      description,
    };

    const newIdea = await services.idea.create(ideaDraft);

    dispatch(storeIdea(newIdea));
    dispatch(loadingIdea(false));
  }

  async function _updateIdea() {
    dispatch(loadingIdea(true));

    services.idea.update(props.idea, { title, description }).catch(setError);

    dispatch(updateIdea(props.idea, { title, description }));
    dispatch(loadingIdea(false));
  }

  async function _createResponse() {
    dispatch(loadingIdea(true));

    const ideaDraft = {
      userID: 1,
      repliesCount: 0,
      title,
      description,
    };

    const [newIdea, updatedIdea] = await services.idea.createResponse(
      ideaDraft,
      repliedIdea
    );

    dispatch(storeIdea(newIdea));
    dispatch(updateIdea(updatedIdea));
    dispatch(loadingIdea(false));
  }

  function getTitleFromMode(mode) {
    return mode === "CREATE"
      ? "Create idea"
      : mode === "UPDATE"
      ? "Update idea"
      : "Create response";
  }

  function resetModal() {
    setTitle("");
    setDescription("");
  }

  return error ? (
    <Redirect to="/error" />
  ) : (
    <Modal show={props.isVisible} onHide={props.hideModal}>
      <Modal.Header>
        <Modal.Title>{getTitleFromMode(props.mode)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl
          className="mt-4"
          placeholder="Idea..."
          value={description}
          as="textarea"
          row={4}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.hideModal();
            resetModal();
          }}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(IdeaModal);
