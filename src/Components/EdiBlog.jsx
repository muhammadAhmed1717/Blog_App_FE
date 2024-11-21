import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiRequest } from '../Utils/fetchApi';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(['role']);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (cookies.role !== 'admin') {
      navigate('/');
    }
  }, [cookies.role, navigate]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (id) {
          const response = await apiRequest({
            endpoint: `/blogs/${id}`,
            method: 'GET',
          });
          setBlogData(response.data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlogData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: blogData?.title || '',
      content: blogData?.content || '',
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      const endpoint = id ? `/${id}` : '/';
      const method = id ? 'PUT' : 'POST';
      const token = cookies.token
      try {
        const response = await apiRequest({
          endpoint,
          method,
          token,
          body: values,
        });

        console.log('Blog saved:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error submitting blog:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-4">
      <h1 className="text-2xl font-bold">{id ? 'Edit Blog' : 'Add Blog'}</h1>

      <div className="mt-4">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 mt-2 border rounded"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block font-medium">Content</label>
        <textarea
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 mt-2 border rounded"
        />
        {formik.touched.content && formik.errors.content && (
          <p className="text-red-500 text-sm">{formik.errors.content}</p>
        )}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
        >
          {id ? 'Update Blog' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default EditBlogPage;
