import React from "react";
import { useId } from "react";
import PropTypes from "prop-types";
import { cn } from "../../../../utils/utils";

const DotPattern = ({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}) => {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80 z-[-100]", // Added z-index class here
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
};

DotPattern.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number, // Added prop type validation for 'y'
  cx: PropTypes.number,
  cy: PropTypes.number,
  cr: PropTypes.number,
  className: PropTypes.string,
};

export default DotPattern;
