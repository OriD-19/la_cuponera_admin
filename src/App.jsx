import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/header/Header';
import CreateCategorie from './components/categories/CreateCategorie';
import Category from './components/categories/Category';
import EditCategorie from './components/categories/EditCategorie';
import DeleteCategory from './components/categories/DeleteCategorie';
import OffersList from './components/Offert/OfferListCategories';
import ProfitsPage from './pages/ProfitsPage';
import ClientsPage from './pages/ClientsPage';
import EnterpriseList from './components/ManageEnterprises/EnterpriseList';
import ManageEnterprises from './pages/ManageEnterprises';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/offers" element={<OffersList />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/create" element={<CreateCategorie />} />
            <Route path="/category/edit/:categoryId" element={<EditCategorie />} />
            <Route path="/category/delete/:categoryId" element={<DeleteCategory />} />
            <Route path="/profits" element={<ProfitsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/enterprise" element={<ManageEnterprises />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App