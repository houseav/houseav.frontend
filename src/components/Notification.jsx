import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Notification({ message }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (message) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { text: message, read: false },
      ]);
    }
  }, [message]);

  const markAsRead = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, i) =>
        i === index ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="fixed top-16 z-2 right-4 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg p-4 space-y-4">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            notification.read ? "bg-gray-100" : "bg-blue-50"
          }`}
        >
          <p className="text-sm text-gray-700">{notification.text}</p>
          {!notification.read && (
            <button
              onClick={() => markAsRead(index)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string,
};
