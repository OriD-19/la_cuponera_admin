import React from 'react'
import { BASE_ADMIN_URL } from '../api/api'

const useClientsList = async () => {

    try {
        //que increible la api de fer
        const res = await fetch(BASE_ADMIN_URL + '/clients', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });

        if (!res.ok) {
            throw new Error(`Error al obtenr los clientes: ${res.status}`);
        }

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('Error en fetchClients', error);
        return null;
    }
}

export default useClientsList
