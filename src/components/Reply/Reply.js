import { memo } from "react";
import constants from "../../constants";

import IdeaCard from "../IdeaCard/IdeaCard";

function Reply(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "0px",
        width: "100%",
      }}>
      <Connector isLast={props.isLast} />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Spacer />
        <IdeaCard idea={props.idea} />
      </div>
    </div>
  );
}

function Connector(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "48px",
      }}>
      <div
        style={{
          width: "3px",
          height: "50%",
          backgroundColor: constants.TEXT_TERTIARY_COLOR,
          boxSizing: "border-box",
        }}
      />
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "calc(50%)" }} />
        <div
          style={{
            width: "calc(50% + 3px)",
            backgroundColor: constants.TEXT_TERTIARY_COLOR,
            height: "3px",
          }}
        />
      </div>
      <div
        style={{
          width: "3px",
          height: "50%",
          backgroundColor: props.isLast
            ? "transparent"
            : constants.TEXT_TERTIARY_COLOR,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function Spacer() {
  return <div style={{ height: "16px" }} />;
}

export default memo(Reply);
