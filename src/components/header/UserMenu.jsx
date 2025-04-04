import React from 'react';
import { TicketIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { NavLink } from 'react-router';

const UserMenu = () => (
    <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center bg-primary text-white px-4 py-2 rounded">
            <TicketIcon className="w-5 h-5 mr-2" />
            Mis Cupones
            <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1">
            <Menu.Item>
                {({ active }) => (
                    <NavLink to="/misCupones" className={`block px-4 py-2 text-black ${active ? 'bg-gray-200' : ''}`}>
                        Cupones Disponibles
                    </NavLink>
                )}
            </Menu.Item>
            {/* <Menu.Item>
                {({ active }) => (
                    <NavLink to="/canjeados" className={`block px-4 py-2 text-black ${active ? 'bg-gray-200' : ''}`}>
                        Cupones Canjeados
                    </NavLink>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                    <NavLink to="/expirados" className={`block px-4 py-2 text-black ${active ? 'bg-gray-200' : ''}`}>
                        Cupones Vencidos
                    </NavLink>
                )}
            </Menu.Item> */}
        </Menu.Items>
    </Menu>
);

export default UserMenu;
