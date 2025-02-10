import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';


const socket = io('http://localhost:3004'); // Adjust the URL as needed

const UserPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('taskAssigned', (task) => {
      setNotifications((prev) => [...prev, `New task assigned: ${task.title}`]);
      toast.success(`New task assigned: ${task.title}`);
    });

    socket.on('taskUpdated', (task) => {
      setNotifications((prev) => [...prev, `Task updated: ${task.title}`]);
      toast.info(`Task updated: ${task.title}`);
    });

    return () => {
      socket.off('taskAssigned');
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      
      <div className="bg-white shadow-md rounded-lg p-6 relative">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">General Information</h3>
            <p>General user information and settings...</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Tasks</h3>
            <p>List of tasks assigned to the user...</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="mb-2">{notification}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;