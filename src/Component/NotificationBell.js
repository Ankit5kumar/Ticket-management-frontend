import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationBell = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative">
        <FaBell className="text-2xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="p-2">
            {notifications.length === 0 ? (
              <li className="text-gray-700">No notifications</li>
            ) : (
              notifications.map((notification, index) => (
                <li key={index} className="mb-2 text-gray-700">
                  {notification}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;