import { useState, useEffect } from 'react';

const fetchFilter = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://apiv1.lacuponera.store/api/v1/admin/offers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error en la request: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data.offers);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOffers();
  }, []);

  return { offers, error };
};

export default fetchFilter;
