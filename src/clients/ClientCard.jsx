import React from 'react'

const ClientCard = ({ id, name, phone, email, couponStats }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Teléfono:</span> {phone}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium">Correo:</span> {email}
      </p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Cupones</h3>
        <ul className="text-sm text-gray-600">
          <li>
            <span className="font-medium text-green-600">Vigentes:</span> {couponStats.active}
          </li>
          <li>
            <span className="font-medium text-blue-600">Canjeados:</span> {couponStats.redeemed}
          </li>
          <li>
            <span className="font-medium text-red-600">Vencidos:</span> {couponStats.expired}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClientCard;