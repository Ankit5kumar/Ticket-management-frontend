import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
  const baseurl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    try {
        const response = await axios.post(`${baseurl}/api/auth/login`, form);
   
 
     Cookies.set("token",response.data.access_token ,{expires:1})
     localStorage.setItem("userInfo",JSON.stringify(response.data.user))
   
        if (response.status === 200) {
          
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Login failed:", error);
        // You can display an error message to the user here
      }
  };
  const handleRegister = async(e) => {
    e.preventDefault();
    // Handle form submission here
    try {
        const response = await axios.post(`${baseurl}/api/auth/register`, form);
   
 
     Cookies.set("token",response.data.access_token ,{expires:1})
     localStorage.setItem("userInfo",JSON.stringify(response.data.user))
   
        if (response.status === 201) {
                       setIsLogin(true);  
                       toast.success("User registered successfully"); 
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.success("Given email or username already exists. Please try a different one."); 
        }
        console.error("Login failed:", error);
        // You can display an error message to the user here
      }
  };

  return (
    <>
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={isLogin ? handleSubmit : handleRegister} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-600" >Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
                placeholder="Username"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isLogin ? 'New here?' : 'Already have an account?'}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-indigo-500 underline hover:text-indigo-600 focus:outline-none"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
