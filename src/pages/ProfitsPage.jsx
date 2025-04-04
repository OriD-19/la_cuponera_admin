import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useEnterpriseOffers from '../hooks/useEnterpriseOffers';
import EnterpriseFilter from '../enterprises/EnterpriseFilter';
import EnterpriseStats from '../enterprises/EnterpriseStats';
import EnterpriseDetails from '../enterprises/EnterpriseDetails';

const ProfitsPage = () => {
  const navigate = useNavigate();
  const [selectedEnterprise, setSelectedEnterprise] = useState('');

  const {
    enterprises = [],
    offersByEnterprise,
    enterpriseEarnings,
    fetchOffersByEnterprise,
    loading,
    error,
  } = useEnterpriseOffers();

  useEffect(() => {
    console.log('Empresas cargadas:', enterprises); 
  }, [enterprises]);

  const handleEnterpriseChange = (enterpriseId) => {
    console.log('Empresa seleccionada:', enterpriseId); 
    setSelectedEnterprise(enterpriseId);

    if (enterpriseId) {
      fetchOffersByEnterprise(enterpriseId);
    }
  };

  //Un cierre de sesion porque ocupaba ver si el token se actualiza
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  //no sale kldsklfdkmlsfkmmkdmklmk
  console.log('Ofertas para la empresa seleccionada:', offersByEnterprise[selectedEnterprise])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ganancias por Empresa</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <EnterpriseFilter
          enterprises={enterprises}
          selectedEnterprise={selectedEnterprise}
          onEnterpriseChange={handleEnterpriseChange}
        />

        <EnterpriseStats
          totals={enterpriseEarnings}
          selectedEnterprise={selectedEnterprise}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && enterprises.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No hay empresas para mostrar</p>
          </div>
        )}

        {!loading &&
          enterprises.map((enterprise) => {
            console.log('Renderizando empresa:', enterprise); // Verifica los datos de cada empresa
            return (
              <EnterpriseDetails
                key={enterprise.id}
                enterprise={enterprise}
                offers={offersByEnterprise[enterprise.id] || []} // Pasa las ofertas de la empresa - MENTIRA
                earnings={enterpriseEarnings[enterprise.id] || 0}
              />
            );
          })}

      </div>
    </div>
  );
};

export default ProfitsPage;