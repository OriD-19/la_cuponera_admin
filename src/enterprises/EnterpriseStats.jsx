import React from 'react';

const EnterpriseStats = ({ offers, selectedEnterprise }) => {
  // Validar que las ofertas sean un array
  const validOffers = Array.isArray(offers) ? offers : [];

  // Calcular estadísticas
  const totalSold = validOffers.reduce((sum, offer) => sum + (offer.sold || 0), 0);
  const totalEarnings = validOffers.reduce(
    (sum, offer) => sum + (offer.sold || 0) * (offer.discountPrice || 0),
    0
  );
  const totalCommission = validOffers.reduce(
    (sum, offer) =>
      sum +
      ((offer.sold || 0) * (offer.discountPrice || 0) * (offer.commissionPercentage || 0)) / 100,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total Ganancias</h3>
        <p className="text-2xl font-bold text-blue-600">${(totalEarnings - totalCommission).toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total Comisiones</h3>
        <p className="text-2xl font-bold text-green-600">${totalCommission.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-700">Cupones Vendidos</h3>
        <p className="text-2xl font-bold text-purple-600">{totalSold}</p>
      </div>
    </div>
  );
};

export default EnterpriseStats;