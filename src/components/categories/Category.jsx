import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://apiv1.lacuponera.store/api/v1/categories");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Cargando categorías...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Función para almacenar los datos de la categoría en localStorage
  const handleCategoryClick = (category) => {
    localStorage.setItem('selectedCategory', JSON.stringify(category));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="p-4 rounded-lg shadow-lg bg-gray-100 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Todas las categorías</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => {
              navigate(`/category/create`);
            }}
          >
            Crear Nueva
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-600 capitalize">{category.name}</h3>
                <p className="text-gray-700">{category.description}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => {
                    handleCategoryClick(category);
                    navigate(`/category/edit/${category.id}`);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => {
                    handleCategoryClick(category);
                    navigate(`/category/delete/${category.id}`);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
