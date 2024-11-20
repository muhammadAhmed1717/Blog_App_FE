import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditBlogPage = () => {
  const { id } = useParams();  // Capture the id param for editing a blog
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null); // State to hold fetched blog data

  // If editing, fetch the blog content, if not, form is empty
  useEffect(() => {
    if (id) {
      // Fetch blog data if editing an existing blog
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then((response) => response.json())
        .then((data) => setBlogData(data))
        .catch((error) => console.error('Error fetching blog:', error));
    }
  }, [id]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: blogData?.title || '',  // Pre-fill if editing, otherwise empty
      content: blogData?.content || '',  // Pre-fill if editing, otherwise empty
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      const url = id
        ? `http://localhost:5000/api/blogs/${id}`  // Edit blog URL if ID exists
        : 'http://localhost:5000/api/blogs';  // Add new blog URL if no ID

      const method = id ? 'PUT' : 'POST';  // Use PUT for editing, POST for adding

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log('Blog saved:', data);
        navigate('/'); // Navigate to the home page after success
      } catch (error) {
        console.error('Error submitting blog:', error);
      }
    },
  });

//   if (id && !blogData) {
//     return <div>Loading...</div>;
//   }

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
