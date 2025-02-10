import React ,  {useEffect ,useState} from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import NotificationBell from './NotificationBell';
// const socket = io('http://localhost:3004');
const socket = io('https://tms-backend-h9a0.onrender.com/');
const Layout = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(()=>{
    socket.on('taskAssigned',(task)=>{
      setNotifications((prev)=>[...prev , `New task assigned: ${task.title}`]);
      toast.success(`New task assigned: ${task.title}`);
    })
    // socket.on('taskUpdated',(task)=>{
    //   setNotifications((prev)=>[...prev , `Task updated: ${task.title}`]);
    //   toast.success(`Task updated: ${task.title}`);
    // })
    return () => {
      socket.off('taskAssigned');
      socket.off('taskUpdated');
    };
  } , []);
  return (
    <div className="flex h-screen">
      <ToastContainer />
      {/* Left Navigation Bar */}
      <Sidebar />
      {/* <p>side bar</p> */}

      {/* Right Content Section */}
      <div className="flex-1 bg-gray-100 relative">
     <div className='absolute top-1 right-0 m-4'>
     <NotificationBell notifications={notifications} />
     </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
