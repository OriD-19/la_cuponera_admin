import React from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const MenuToggle = () => (
    <>
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <label htmlFor="menu-toggle" className="md:hidden cursor-pointer">
            <Bars3Icon className="w-8 h-8 text-black peer-checked:hidden" />
            <XMarkIcon className="w-8 h-8 text-black hidden peer-checked:block" />
        </label>
    </>
);

export default MenuToggle;
