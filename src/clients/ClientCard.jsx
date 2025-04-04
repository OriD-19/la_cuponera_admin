import React from 'react'

const ClientCard = ({ id, name, phone, email, couponStats }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">Teléfono: {phone}</p>
      <p className="text-sm text-gray-600">Correo: {email}</p>
      <div className="mt-2">
        <p className="text-sm text-gray-600">Cupones:</p>
        <ul className="list-disc pl-5">
          <li>Vigentes: {couponStats.active}</li>
          <li>Canjeados: {couponStats.redeemed}</li>
          <li>Vencidos: {couponStats.expired}</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientCard;