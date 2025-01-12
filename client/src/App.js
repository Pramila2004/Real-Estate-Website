import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Listpage from './pages/Listpage';
import Loginpage from './pages/Loginpage';
import Register from './pages/Register';
import Singlepage from './pages/Singlepage';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Update from './pages/Update';
import Newpost from './pages/Newpost';
import About from './pages/About';
import ContactPage from './pages/contact';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<Listpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/singlepage/:id" element={<Singlepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
        <Route path="/newpost" element={<Newpost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
