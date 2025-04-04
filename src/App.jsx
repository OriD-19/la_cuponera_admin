import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/header/Header';
import OffersList from './components/Offert/OfferList';
import CreateCategorie from './components/categories/CreateCategorie';
import Category from './components/categories/Category';
import EditCategorie from './components/categories/EditCategorie';
import DeleteCategory from './components/categories/DeleteCategorie';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/offers" element={<OffersList />} />

            
            <Route path="/category" element={<Category />} />
            <Route path="/category/create" element={<CreateCategorie />} />
            <Route path="/category/edit/:categoryId" element={<EditCategorie />} />
            <Route path="/category/delete/:categoryId" element={<DeleteCategory />} />


            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
