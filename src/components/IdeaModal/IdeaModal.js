import { memo, useState, useEffect } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import services from "../../services";

import { useStore } from "../../store";
import { storeIdea, loadingIdea, updateIdea } from "../../store/idea.actions";
import utils from "../../utils";

function CreateIdeaModal({
  visible,
  hideModal,
  initialValue,
  mode = "CREATE",
}) {
  const [_, dispatch] = useStore();

  const [repliedIdea, setRepliedIdea] = useState(undefined);
  const [title, setTitle] = useState(""); // prettier-ignore
  const [description, setDescription] = useState(""); // prettier-ignore

  useEffect(() => {
    if (mode === "EDIT") {
      setTitle(initialValue.title);
      setDescription(initialValue.description);
    }

    if (mode === "RESPONSE") {
      setRepliedIdea(initialValue);
    }
  }, [mode]);

  function handleSubmit() {
    if (mode === "CREATE") {
      _createIdea();
    } else if (mode === "EDIT") {
      _updateIdea();
    } else {
      _createResponse();
    }
    hideModal();
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

    services.idea.update(initialValue, { title, description });

    dispatch(updateIdea(initialValue, { title, description }));
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

    const [newIdea, updatedRepliedIdea] = await services.idea.createResponse(
      ideaDraft,
      repliedIdea
    );

    dispatch(storeIdea(newIdea));
    dispatch(updateIdea(repliedIdea, updatedRepliedIdea));
    dispatch(loadingIdea(false));
  }

  function getTitleFromMode(mode) {
    return mode === "CREATE"
      ? "Create idea"
      : mode === "EDIT"
      ? "Update idea"
      : "Create response";
  }

  function resetModal() {
    setTitle("");
    setDescription("");
  }

  return (
    <Modal show={visible} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>{getTitleFromMode(mode)}</Modal.Title>
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
            hideModal();
            resetModal();
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(CreateIdeaModal);
