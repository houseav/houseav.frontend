import PropTypes from "prop-types";

export default function Badge({ message, styleType }) {
  const baseClasses =
    "text-xs font-medium me-2 px-2.5 py-0.5 rounded transition-all duration-300";

  let styleClasses = "";

  switch (styleType) {
    case "dark":
      styleClasses =
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-800";
      break;
    case "green":
      styleClasses =
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-2 border-transparent hover:border-green-800";
      break;
    case "yellow":
      styleClasses =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-2 border-transparent hover:border-yellow-800";
      break;
    case "indigo":
      styleClasses =
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-2 border-transparent hover:border-indigo-800";
      break;
    case "purple":
      styleClasses =
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-2 border-transparent hover:border-purple-800";
      break;
    case "blue":
      styleClasses =
        "shadow-md bg-blue-400/30 text-white dark:bg-blue-900/30 dark:text-white hover:animate-pulse border-2 border-transparent hover:bg-blue-400/50";
      break;
    case "red":
      styleClasses =
        "shadow-md bg-red-400/30 text-white dark:bg-red-900/30 dark:text-white hover:animate-pulse border-2 border-transparent hover:bg-red-400/50";
      break;
    default:
      styleClasses =
        "bg-red-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-2 border-transparent hover:border-blue-800";
      break;
  }

  const classes = `${baseClasses} ${styleClasses}`;

  return <div className={classes}>{message}</div>;
}

Badge.propTypes = {
  message: PropTypes.string.isRequired,
  styleType: PropTypes.string,
};
