import { useState, memo } from "react";
import { Navbar as NativeNavbar, Button, Image } from "react-bootstrap";
import { useLocation } from "react-router";
import constants from "../../constants";
import IdeaModal from "../IdeaModal";

function Navbar(props) {
  const location = useLocation();

  const [createModal, setCreateModal] = useState({
    isVisible: false,
    defaultValue: "",
  });

  const showModal = () => setCreateModal({ ...createModal, isVisible: true });

  const hideModal = () => setCreateModal({ ...createModal, isVisible: false });

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
      <Button variant="transparent" onClick={showModal}>
        <i
          className="bi fs-3 bi-lightbulb-fill"
          style={{ color: constants.PRIMARY_COLOR }}
        />
      </Button>
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
