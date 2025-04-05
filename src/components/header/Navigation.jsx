import React from 'react';
import { NavLink } from 'react-router';


const Navigation = () => {

    const role = localStorage.getItem('role');

    return (
        <nav className="peer-checked:flex hidden absolute z-20 top-full left-0 w-full bg-white flex-col items-center shadow-lg md:relative md:top-0 md:flex md:flex-row md:w-auto md:space-x-6 md:bg-transparent md:shadow-none">
            <NavLink to="/offers" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Ofertas
            </NavLink>

            <NavLink to="/profits" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Ganancias
            </NavLink>

            <NavLink to="/clients" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Clientes
            </NavLink>

            <NavLink to="/category" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Categorías
            </NavLink>

            <NavLink to="/enterprise" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Empresas
            </NavLink>


        </nav>
    );
}

export default Navigation;
