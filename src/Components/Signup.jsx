import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
  const navigate = useNavigate();
  const [logerror, setLogerror] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      role: Yup.string()
        .oneOf(['user', 'admin'], 'Invalid role') // Adjust roles as needed
        .required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (data === "Try To Login Again") {
          setLogerror('Signup failed. Please try again.');
        } else {
          console.log('Signup successful:', data);
          setLogerror('');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setLogerror('An error occurred. Please try again later.');
      }
    },
  });

  return (
    <form
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center text-teal-600 mb-4">Signup</h1>
      <p className="text-center text-gray-600 mb-6">
        We Hope You Will Enjoy Your Journey!!!
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Username:</label>
        <input
          type="text"
          name="username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter Your Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password:</label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter Your Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Role:</label>
        <select
          name="role"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" label="Select role" />
          <option value="user" label="User" />
          <option value="admin" label="Admin" />
        </select>
        {formik.touched.role && formik.errors.role && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
        )}
      </div>

      <Link to="/login" className="text-center text-teal-600 block mb-4">
        Already Have An Account? Login
      </Link>
      <button
        type="submit"
        className="bg-teal-600 text-white font-medium py-2 px-4 w-full rounded-md hover:bg-teal-700 transition duration-300"
      >
        Signup
      </button>
      {logerror && (
        <p className="text-red-500 text-center mt-4">{logerror}</p>
      )}
    </form>
  );
}
