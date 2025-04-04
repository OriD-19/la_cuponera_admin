import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const DeleteCategory = () => {
    const navigate = useNavigate();
    
    // Obtener la categoría seleccionada desde localStorage
    const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No tienes permisos para eliminar esta categoría.");
            return;
        }

        if (!selectedCategory) {
            alert("No se encontró la categoría para eliminar.");
            return;
        }

        const categoryId = selectedCategory.id;

        setIsDeleting(true);

        try {
            const res = await fetch(`https://apiv1.lacuponera.store/api/v1/admin/categories/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }

            alert('Categoría eliminada correctamente');
            navigate('/category'); // Redirige a la lista de categorías después de la eliminación

        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            alert("Hubo un problema al eliminar la categoría.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Eliminar Categoría</h1>
            {selectedCategory ? (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                    <h2 className="text-xl font-bold mb-4">¿Estás seguro de que deseas eliminar esta categoría?</h2>
                    <p className="mb-4">Nombre: {selectedCategory.name}</p>
                    <p className="mb-4">Descripción: {selectedCategory.description}</p>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isDeleting ? 'opacity-50' : ''}`}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar Categoría'}
                    </button>
                </div>
            ) : (
                <p className="text-gray-700">No se encontró la categoría para eliminar.</p>
            )}
        </div>
    );
};

export default DeleteCategory;
