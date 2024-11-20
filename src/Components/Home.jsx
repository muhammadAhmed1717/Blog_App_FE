import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    // fetchBlogs();
    setBlogs([
        {
          "id": 1,
          "title": "My First Blog",
          "content": "This is the content of my first blog post."
        },
        {
          "id": 2,
          "title": "Another Blog Post",
          "content": "Here is some more content for the second blog post."
        }
      ]
      )
  }, []);

  const fetchBlogs = async () => {
    const response = await fetch('http://localhost:5000/api/blogs');
    const data = await response.json();
    setBlogs(data);
  };

  const handleDeleteBlog = (id) => {
    console.log(`Delete blog with ID: ${id}`);
  };

  const handleEditBlog = (id) => {
    console.log(`Edit blog with ID: ${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto my-6">
      {role === 'admin' && (
        <Link to="/add-blog">
          <button className="bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 mb-6">
            Add Blog
          </button>
        </Link>
      )}

      <div>
      {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md mb-9">
            <h2 className="text-2xl font-bold text-teal-600 mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">{blog.content}</p>

            {role === 'admin' && (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleEditBlog(blog.id)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  <FaEdit className="inline-block mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt className="inline-block mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
