import { useState, useEffect, useCallback } from 'react';
import { BASE_ADMIN_URL } from '../api/api';

const useEnterpriseOffers = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [offersByEnterprise, setOffersByEnterprise] = useState([]);
  const [enterpriseEarnings, setEnterpriseEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnterprises = async () => {
      setLoading(true);

      try {
        const res = await fetch(BASE_ADMIN_URL + "/enterprises", {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        });

        const data = await res.json();
        
        if (res.ok) {
          setEnterprises(data);
          setError(null);
        } else {
          console.error('Error fetching enterprises:', data.message);
          setError(data.message);
        }
      } catch (err) {
        console.error('Error fetching enterprises:', err);
        setError('Failed to fetch enterprises');
      } finally {
        setLoading(false);
      }
    };

    fetchEnterprises();
  }, []);

  const fetchOffersByEnterprise = async (enterpriseId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_ADMIN_URL}/enterprises/${enterpriseId}/offers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar las ofertas');
      }
  
      const enrichedOffers = data.offers.map((offer) => {
        const sold = offer.sold || 0;
        const discountPrice = offer.discountPrice || 0;
        const commissionPercentage = offer.commissionPercentage || 0;
  
        const totalRevenue = sold * discountPrice;
        const commission = (totalRevenue * commissionPercentage) / 100;
  
        return {
          ...offer,
          sold,
          totalRevenue,
          commission
        };
      });
  
      setOffersByEnterprise((prev) => ({
        ...prev,
        [enterpriseId]: enrichedOffers,
      }));
  
      const earnings = enrichedOffers.reduce((acc, offer) => acc + offer.totalRevenue, 0);
  
      setEnterpriseEarnings((prev) => ({
        ...prev,
        [enterpriseId]: earnings,
      }));
  
    } catch (err) {
      setError('Error al cargar las ofertas');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    enterprises,
    offersByEnterprise,
    enterpriseEarnings,
    fetchOffersByEnterprise,
    loading,
    error,
  };
};

export default useEnterpriseOffers;