import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import EditBlogPage from './Components/EdiBlog';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navbar/><Home /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<><Navbar /><EditBlogPage /></>} />
          <Route path="/edit/:id" element={<><Navbar /><EditBlogPage /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
