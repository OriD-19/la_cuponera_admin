import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />


            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
