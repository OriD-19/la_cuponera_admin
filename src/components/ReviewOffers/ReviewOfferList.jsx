import React, { useEffect, useState } from 'react'
import ReviewOfferCard from './ReviewOfferCard'
import { BASE_ADMIN_URL } from '@/api/api';

const ReviewOfferList = () => {

  const [pendingOffers, setPendingOffers] = useState([]);

  useEffect(() => {
    const fetchPendingOffers = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch(
          `${BASE_ADMIN_URL}/offers/pending`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Error al obtener ofertas pendientes");
        const data = await res.json();
        console.log(data);
        setPendingOffers(data);
      } catch (err) {
        console.error(err)
        setPendingOffers([])
      }
    }

    fetchPendingOffers()
  });

  return (

    <div className="flex md:flex-col flex-row flex-wrap gap-4 md:gap-0">
      {pendingOffers.map((offer) => (
        <ReviewOfferCard
          key={offer.id}
          id={offer.id}
          merchantName={offer.merchant.name}
          offerTitle={offer.title}
          discount={offer.discountPrice}
          submissionDate={offer.createdAt}
          expiryDate={offer.expiryDate}
          status={offer.status}
          category={offer.category.name}
          onApprove={() => console.log("Approved")}
          onReject={() => console.log("Rejected")}
          onViewDetails={() => console.log("View Details")}
        />
      ))}
    </div>
  )
}

export default ReviewOfferList