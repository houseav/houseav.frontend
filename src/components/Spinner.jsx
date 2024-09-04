import gif from "../assets/spinner-loading.gif";
import PropTypes from "prop-types";
import React from "react";

export default function Spinner({ height, width }) {
  if (!height) height = 25;
  if (!width) width = 25;
  return (
    <div>
      <img src={gif} width={width} height={height} />
    </div>
  );
}

Spinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
