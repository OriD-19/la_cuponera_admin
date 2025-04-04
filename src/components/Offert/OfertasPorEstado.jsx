import { useState } from "react";
import fetchFilter from "../../hooks/fetchFilter";
import EstadosDropdown from "../header/DropDownMenu";

export default function OfertasPorEstado() {
  const { offers } = fetchFilter();
  const [selectedState, setSelectedState] = useState(null);

  const ofertasFiltradas = selectedState
    ? offers.filter((offer) => offer.offerState === selectedState)
    : [];

  return (
    <div className="space-y-4">
      <EstadosDropdown onSelect={setSelectedState} />

      <div className="mt-4">
        {selectedState && (
          <h2 className="text-xl font-bold text-gray-700">
            Ofertas en estado: {selectedState}
          </h2>
        )}
        {ofertasFiltradas.length === 0 && selectedState ? (
          <p className="text-sm text-gray-500">No hay ofertas en este estado.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {ofertasFiltradas.map((offer) => (
              <li key={offer.id} className="py-2">
                <div className="border p-4 rounded-lg shadow-md w-80">
                    <h2 className="text-xl font-bold">{offer.title}</h2>
                    <p className="text-gray-600">{offer.description}</p>
                    <p className="text-green-500 font-semibold">Precio con descuento: ${offer.discountPrice}</p>
                    <p className="text-red-500 line-through">Precio original: ${offer.originalPrice}</p>
                    <p className="text-sm text-gray-500">Estado: {offer.offerState}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};