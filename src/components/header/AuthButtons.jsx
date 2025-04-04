import React from 'react';
import { NavLink } from 'react-router';


const AuthButtons = () => (
    <>
        <NavLink to="/" className="border border-primary text-primary px-4 py-2 rounded">
            Iniciar sesión
        </NavLink>
    </>
);

export default AuthButtons;
