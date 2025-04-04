import React from 'react';

import OfferList from '../offers/OfferList';
import OffersList from '../offers/OffersListProfits';

const EnterpriseDetails = ({ enterprise, offers, earnings }) => {
  console.log('Detalles de la empresa:', enterprise);
  console.log('Ofertas:', offers);
  console.log('Ganancias:', earnings);

  if (!enterprise) {
    return null;
  }

  const {
    enterpriseCode: code,
    commissionPercentage,
  } = enterprise;


  const offersArray = Array.isArray(offers) ? offers : [];


  const totalSold = offersArray.reduce((sum, offer) => sum + offer.sold, 0);
  const totalEarnings = earnings;
  const totalCommission = offersArray.reduce((sum, offer) => {
    const soldEarnings = offer.sold * offer.discountPrice;
    return sum + (soldEarnings * commissionPercentage) / 100;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold p-2">
          Empresa: {code} (ID: {enterprise.id})
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">
              Ventas Totales
            </p>
            <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">
              Comisión (La Cuponera)
            </p>
            <p className="text-2xl font-bold">${totalCommission.toFixed(2)}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">
              Porcentaje de Comisión
            </p>
            <p className="text-2xl font-bold">{commissionPercentage}%</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">
              Cupones Vendidos
            </p>
            <p className="text-2xl font-bold">{totalSold}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <h3 className="text-lg font-semibold mb-4">
          Ofertas ({offersArray.length})
        </h3>
        <OffersList offers={offersArray} />
      </div>
    </div>
  );
};

export default EnterpriseDetails;