import React, { useEffect, useState } from 'react';
import { BASE_ADMIN_URL } from '../api/api';
import OfferCard from './OfferCard';

const OffersList = ({ enterpriseId }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_ADMIN_URL}/offers/enterprise`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error al obtener ofertas: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Ofertas obtenidas para la empresa ${enterpriseId}:`, data);
        setOffers(data || []);
        setError(null);
      } catch (error) {
        console.error('Error en fetchOffers:', error);
        setError('No se pudieron obtener las ofertas.');
      } finally {
        setLoading(false);
      }
    };

    if (enterpriseId) {
      fetchOffers();
    }
  }, [enterpriseId]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando ofertas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!offers || offers.length === 0) {
    return <p className="text-center text-gray-500">No hay ofertas disponibles para esta empresa.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <div key={offer.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <OfferCard/>
          <div className="px-4 py-3 bg-gray-50 border-t">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">
                Vendidos: <span className="font-bold text-purple-600">{offer.sold || 0}</span>
              </span>
              <span className="font-medium">
                Ganancia: <span className="font-bold text-green-600">${(offer.sold * offer.discountPrice).toFixed(2)}</span>
              </span>
            </div>
            <div className="text-sm mt-1">
              Comisión ({offer.commissionPercentage}%):{' '}
              <span className="font-bold text-blue-600">
                ${((offer.sold * offer.discountPrice * offer.commissionPercentage) / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OffersList;