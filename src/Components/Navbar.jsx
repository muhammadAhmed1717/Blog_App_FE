import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogout = () => {
    console.log("Logout Clicked");
    removeCookie("token");
    removeCookie("role");
  };
  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, [cookies, navigate]);

  return (
    <nav className="flex justify-between items-center p-4 bg-teal-500 text-white shadow-lg">
      <h1 className="text-2xl font-bold">Blog App</h1>
      <button
        onClick={handleLogout}
        className="bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
