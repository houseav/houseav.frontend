import { useState } from "react";
import "./RippleButton.css";
import PropTypes from "prop-types";

const RippleButton = ({ onClick, children }) => {
  const [rippleStyle, setRippleStyle] = useState({});

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRippleStyle = {
      width: `${size}px`,
      height: `${size}px`,
      top: `${y}px`,
      left: `${x}px`,
    };

    setRippleStyle(newRippleStyle);
  };

  return (
    <button
      className="ripple-btn flex items-center space-x-2 hover:bg-slate-300/40 hover:shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out rounded-md pl-2 pt-1 pb-1 pr-1"
      onClick={(e) => {
        createRipple(e);
        onClick();
      }}
    >
      {children}
      <span className="ripple" style={rippleStyle}></span>
    </button>
  );
};

RippleButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default RippleButton;
