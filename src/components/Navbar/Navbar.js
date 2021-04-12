import { useState, memo } from "react";
import {
  Navbar as NativeNavbar,
  Image,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import utils from "../../utils";

import IdeaModal from "../IdeaModal";

function Navbar(props) {
  const user = utils.firebase.auth().currentUser;

  const [createModal, setCreateModal] = useState({
    isVisible: false,
    defaultValue: "",
  });

  const showModal = () => setCreateModal({ ...createModal, isVisible: true });

  const hideModal = () => setCreateModal({ ...createModal, isVisible: false });

  function logOut() {
    utils.firebase.auth().signOut();
  }

  return (
    <NativeNavbar
      style={styles.navbar}
      className="d-flex flex-row justify-content-between align-items-center sticky-top shadow-sm">
      {props.left ? (
        props.left()
      ) : (
        <NativeNavbar.Brand className="ms-2">
          <Image rounded src="/icons/zetty-logo.svg" />
        </NativeNavbar.Brand>
      )}
      <DropdownButton
        variant="transparent"
        style={{ display: "flex", justifyContent: "flex-end" }}
        title={user && user.email}
        id="dropdown-menu-align-right">
        <Dropdown.Item onClick={showModal}>Create New Idea</Dropdown.Item>
        <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
      </DropdownButton>
      <IdeaModal
        isVisible={createModal.isVisible}
        hideModal={hideModal}
        mode="CREATE"
      />
    </NativeNavbar>
  );
}

const styles = {
  navbar: {
    backgroundColor: "white",
    border: "1px solid lightgrey",
    borderBottomRightRadius: "16px",
    borderBottomLeftRadius: "16px",
  },
};

export default memo(Navbar);
