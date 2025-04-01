import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/services" element={<div>Services</div>} />
          <Route path="/products" element={<div>Products</div>} />
          <Route path="/blog" element={<div>Blog</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
