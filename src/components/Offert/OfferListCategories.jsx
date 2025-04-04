import { useEffect, useState } from "react";
import OfferCard from "./OfferCard";
import Filtro from "../header/Filtro";
import OfertasPorEstado from "./OfertasPorEstado";

const OffersList = () => {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchOffers = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch("https://apiv1.lacuponera.store/api/v1/admin/offers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`Error en la request: ${response.status}`);
          }
          const data = await response.json();
          setOffers(data.offers);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchOffers();
    }, []);
  
    return (
      <div className="py-4 px-35">
        <OfertasPorEstado/>

        <p>TODAS LAS OFERTAS</p>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="flex flex-wrap gap-4">
          {offers.length > 0 ? (
            offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
          ) : (
            <p>No hay ofertas disponibles.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default OffersList;