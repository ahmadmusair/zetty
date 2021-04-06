import React, { useState, memo } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function SequelModal({ visible, hideModal, prequelID }) {
  const [description, setDescription] = useState("");

  return (
    <Modal show={visible} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Create continuation/sequel</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Form>
          <Form.Group controlId="description">
            <Form.Control
              value={description}
              placeholder="Write your idea here..."
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button variant="primary" onClick={hideModal}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(SequelModal);
