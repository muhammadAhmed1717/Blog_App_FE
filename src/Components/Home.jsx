import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { apiRequest } from "../Utils/fetchApi";

export default function Home() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [role, setRole] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if (!cookies.role || !cookies.token) {
            navigate("/login");
        }
        fetchBlogs();
        setRole(cookies.role);
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await apiRequest({
                endpoint: "/",
                method: "GET",
            });
            console.log("Response blogs", response.data);
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleDeleteBlog = async (id) => {
        console.log(`Delete blog with ID: ${id}`);
        console.log("Cookies token", cookies.token);
        try {
            const response = await apiRequest({
                endpoint: `/${id}`,
                method: "DELETE",
                token: cookies.token,
            });
            console.log("Blog deleted:", response.data);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const handleEditBlog = (id) => {
        console.log(`Edit blog with ID: ${id}`);
        navigate(`/edit/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto my-6">
            <div>
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white p-6 rounded-lg shadow-md mb-9"
                    >
                        <h2 className="text-2xl font-bold text-teal-600 mb-2">
                            {blog.title}
                        </h2>
                        <p className="text-gray-700 mb-4">{blog.content}</p>

                        {role === "admin" && (
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => handleEditBlog(blog._id)}
                                    className="text-teal-600 hover:text-teal-800"
                                >
                                    <FaEdit className="inline-block mr-2" />{" "}
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteBlog(blog._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrashAlt className="inline-block mr-2" />{" "}
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            <div>
            {blogs.length === 0 ? <div className="text-xl italic text-teal-500 font-bold font-mono">
                Nothing on site yet
            </div>: <></>}
            {role === "admin" && blogs.length === 0 ? (
                <div className="text-xl italic text-teal-500 font-bold font-mono">
                    Click on Add BLog to add Blogs
                </div>
            ) : (
                <></>
            )}
                </div>
            </div>
            {role === "admin" && (
                <Link to="/add">
                    <button className="bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 my-6">
                        Add Blog
                    </button>
                </Link>
            )}
        </div>
    );
}
