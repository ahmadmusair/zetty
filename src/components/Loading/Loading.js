import { memo } from "react";

function Loading() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h3>Loading...</h3>
    </div>
  );
}

export default memo(Loading);
