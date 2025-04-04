// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("https://apiv1.lacuponera.store/api/v1/categories");
//         if (!response.ok) {
//           throw new Error("Error al obtener las categorías");
//         }
//         const data = await response.json();
//         setCategories(data.categories);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) return <p className="text-center text-gray-600">Cargando categorías...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {categories.map((category) => (
//         <div key={category.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
//           <h3 className="text-lg font-bold text-blue-600">{category.name}</h3>
//           <p className="text-gray-700">{category.description}</p>
//           <button
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => navigate(`/category/edit/${category.id}`)}
//           >
//             Editar
//           </button>
//           <button
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//             onClick={() => navigate(`/category/delete/${category.id}`)}
//           >
//             Eliminar
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Category;

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

  return (<>
    <button
    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
    onClick={() => {
    //   handleCategoryClick(category);  // Guardar los datos de la categoría
      navigate(`/category/create`);
    }}
  >
    Crear
  </button>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <div key={category.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-blue-600">{category.name}</h3>
          <p className="text-gray-700">{category.description}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleCategoryClick(category);  // Guardar los datos de la categoría
              navigate(`/category/edit/${category.id}`);
            }}
          >
            Editar
          </button>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleCategoryClick(category);  // Guardar los datos de la categoría
              navigate(`/category/delete/${category.id}`);
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default Category;
