import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";
import { useFormik } from 'formik';
import { apiRequest } from '../Utils/fetchApi';
import * as Yup from 'yup';

export default function Login() {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [logerror, setLogerror] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
        const encryptedPassword = CryptoJS.AES.encrypt(values.password, "ProudTo_Be@Pakistani").toString(); // Encrypt password
        
        const response = await apiRequest({
          endpoint: '/login',
          method: 'POST',
          body: {
            username: values.username,
            password: encryptedPassword,
          },
        });
    
        if (response.success) {
          if (response.data === "Try To Login Again") {
            setLogerror('Invalid credentials. Please try again.');
          } else {
            console.log('Login successful:', response);
            setCookie('token', response.data.token, { path: '/' });
            setCookie('role', response.data.role, { path: '/' });

            navigate('/');
          }
        } else {
          setLogerror(response.error || 'An error occurred. Please try again.');
        }
    },
  });

  return (
    <form
      className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center text-teal-500">Login</h1>
      <p className="text-center text-gray-600 mb-6">Welcome To Your Account!!!</p>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
            formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>
      <p className="text-center text-teal-500 mb-2 cursor-pointer hover:underline">
        Forgot Password?
      </p>
      <Link
        to="/signup"
        className="block text-center text-gray-700 mb-4 hover:underline"
      >
        Don't Have An Account? Signup
      </Link>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Login
      </button>
      {logerror && <p className="text-red-500 text-center mt-4">{logerror}</p>}
    </form>
  );
}
