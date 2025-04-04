import React from 'react'
import Categorias from './DropDownMenu'
import EstadosDropdown from './DropDownMenu';


export const Filtro = () => {
    return (
        <div className="flex space-x-2 py-4 px-20 bg-white shadow-md mt-4 rounded flex-wrap md:flex-grow">
            <div className='mt-2 md:mt-0'><EstadosDropdown/></div>
            {/* ESTE ES DE LAS EMPRESAS */}
            {/*<div className='mt-2 md:mt-0'><Categorias/></div>*/}
            {/* <button type='button' className="border-3 bg-base border-resaltador px-6 py-2 rounded text-resaltador font-semibold font-sans">Categoría</button> */}
            {/* <button className="border-3 bg-base border-resaltador px-6 py-2 rounded text-resaltador font-semibold font-sans">Marca</button> */}
            <div className="flex-grow mt-2 md:mt-0">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full bg-base border-3 border-resaltador px-4 py-2 rounded"
                />
            </div>
        </div>
    )
}

export default Filtro;