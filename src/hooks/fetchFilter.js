import { useEffect, useState } from 'react';

const fetchFilter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://apiv1.lacuponera.store/api/v1/categories');
        if (!res.ok) throw new Error('Error al obtener categorías');
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default fetchFilter;
