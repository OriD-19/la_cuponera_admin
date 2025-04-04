import React, { useEffect, useState } from 'react';
import useClientsList from '../hooks/useClientsList';
import ClientCard from './ClientCard';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const data = await useClientsList();
      if (data) {
        setClients(data.clients);
      }
    };
    loadClients();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Panel de Clientes</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="">
          {clients.map((client) => {
            // el nombre completo, primero accede al user
            const fullName = `${client.user.firstName} ${client.user.lastName}`;

            // clasificacion de los cupoens
            const couponStats = client.Coupons.reduce(
              (acc, coupon) => {
                const now = new Date();
                const validUntil = new Date(coupon.validUntil);

                if (coupon.redeemed) {
                  acc.redeemed += 1; // canjeados
                } else if (validUntil < now) {
                  acc.expired += 1; // vencidos
                } else {
                  acc.active += 1; // vigentes
                }

                return acc;
              },
              { redeemed: 0, expired: 0, active: 0 }
            );

            return (
              <div key={client.id} className="mb-4">
                <ClientCard
                  id={client.id}
                  name={fullName}
                  phone={client.phone}
                  email={client.user.email}
                  coupons={client.Coupons}
                  couponStats={couponStats}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ClientList;
