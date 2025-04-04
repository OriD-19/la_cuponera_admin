// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router";

// export default function EditCategory() {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Obtener la categoría guardada en localStorage o dejar valores vacíos
//   const storedCategory = JSON.parse(localStorage.getItem("selectedCategory")) || { name: "", description: "" };
//   const [category, setCategory] = useState(storedCategory);

//   const handleChange = (e) => {
//     setCategory({ ...category, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`https://apiv1.lacuponera.store/api/v1/admin/categories/categories/${categoryId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(category),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       alert("Categoría actualizada correctamente");
//       navigate("/category");
//     } catch (error) {
//       console.error("Error updating category:", error);
//       alert("Error al actualizar la categoría");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Editar Categoría</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Nombre</label>
//           <input
//             type="text"
//             name="name"
//             value={category.name}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Descripción</label>
//           <textarea
//             name="description"
//             value={category.description}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//           Guardar Cambios
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const EditCategory = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    
    // Obtener categoría guardada en localStorage
    const savedCategory = JSON.parse(localStorage.getItem('selectedCategory')) || { name: '', description: '' };

    const [formData, setFormData] = useState({
        name: savedCategory.name || '',
        description: savedCategory.description || '',
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("No tienes permisos para editar esta categoría.");
            return;
        }

        try {
            const res = await fetch(`https://apiv1.lacuponera.store/api/v1/admin/categories/categories/${categoryId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }

            alert('Categoría actualizada correctamente');
            navigate('/category'); // Redirige a la lista de categorías

        } catch (error) {
            console.error("Error al actualizar la categoría:", error);
            alert("Hubo un problema al actualizar la categoría.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Editar Categoría</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
                onSubmit={handleOnSubmit}>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre de la Categoría
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        placeholder="Ingrese el nombre"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        placeholder="Ingrese una descripción"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditCategory;
