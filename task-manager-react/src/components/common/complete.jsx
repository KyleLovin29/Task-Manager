import React from "react";

const Complete = (props) => {
  let classes = "fa fa-circle-thin";
  if (props.complete) classes = "fa fa-circle";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Complete;
