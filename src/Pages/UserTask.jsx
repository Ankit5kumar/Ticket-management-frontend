import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket = io('http://localhost:3004'); 
const UserTask = () => {
  const [tasks, setTasks] = useState([]);
  const baseurl = process.env.REACT_APP_BASE_URL;


  const fetchTasks = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${baseurl}/api/tasks/mytask`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data");
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  }, [baseurl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

 

 

  const handleUpdateTask = async (taskId, newStatus, newDueDate) => {
    try {
      const token = Cookies.get("token");
      const body = {};
      if (newStatus) body.status = newStatus;
      if (newDueDate) body.dueDate = newDueDate;

      const response = await fetch(`${baseurl}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      fetchTasks();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

   useEffect(() => {
      socket.on('taskAssigned', (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
       fetchTasks();
        // toast.success(`Task "${task.title}" created!`);
      });
  
      socket.on('taskUpdated', (updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
        toast.success(`Task "${updatedTask.title}" updated!`);
      });
  
      socket.on('taskDeleted', (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      });
      fetchTasks();
  
      return () => {
        socket.off('taskCreated');
        socket.off('taskUpdated');
        socket.off('taskDeleted');
      };
    });

  return (
    <div className="bg-gray-100 h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Assigned Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-gray-600 mt-2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className={`mt-2 text-sm font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              Priority: {task.priority}
            </p>
            <p className={`mt-2 text-sm font-semibold ${task.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
              Status: {task.status}
            </p>
            <label htmlFor={`status-${task._id}`} className="block mt-2">Status</label>
            <select
              id={`status-${task._id}`}
              value={task.status}
              onChange={(e) => handleUpdateTask(task._id, e.target.value, null)}
              className="border border-gray-300 p-1 rounded w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="mt-4 flex justify-between">
              <input
                type="date"
                onChange={(e) => handleUpdateTask(task._id, null, e.target.value)}
                className="border border-gray-300 p-1 rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTask;