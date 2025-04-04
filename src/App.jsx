import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import ProfitsPage from './pages/ProfitsPage';
import ClientsPage from './pages/ClientsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profits" element={<ProfitsPage/>} />
          <Route path="/clients" element={<ClientsPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
