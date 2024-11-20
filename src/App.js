import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import EditBlogPage from './Components/EdiBlog';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<EditBlogPage />} />
          <Route path="/edit/:id" element={<EditBlogPage />} />
          {/* <Route path="/post" element={<UserPost />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
