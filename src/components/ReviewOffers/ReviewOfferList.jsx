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
        setPendingOffers([...data]);
        console.log(pendingOffers);
      } catch (err) {
        console.error(err);
        setPendingOffers([]);
      }
    }

    fetchPendingOffers();
  }, []);

  console.log(pendingOffers);

  const getCategory = (offer) => {
    if (offer.enterprise.Category) {
      return offer.enterprise.Category.name;
    } else {
      return "Sin categoría";
    }
  }

  return (
    <div className="w-full flex md:flex-row flex-col flex-wrap gap-6 md:gap-4 items-center justify-center">
      {pendingOffers.map((offer) => (
        <ReviewOfferCard
          key={offer.id}
          id={offer.id}
          merchantName={offer.enterprise.user.firstName}
          offerTitle={offer.title}
          discount={offer.discountPrice}
          submissionDate={offer.createdAt}
          expiryDate={offer.validUntil}
          status={offer.offerState.toLowerCase()}
          category={getCategory(offer)}
          onApprove={() => console.log("Approved")}
          onReject={() => console.log("Rejected")}
          onViewDetails={() => console.log("View Details")}
        />
      ))}
    </div>
  )
}

export default ReviewOfferList