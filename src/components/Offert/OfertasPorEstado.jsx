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
          <ul className="divide-gray-200 flex flex-wrap gap-4 mb-4">
            {ofertasFiltradas.map((offer) => (
              <li key={offer.id} className="p-4 rounded-lg shadow-lg w-80 bg-blue-50 ">
                <div className="">
                  <h2 className="text-xl font-bold text-center capitalize mb-2">{offer.title}</h2>
                  <p className="text-gray-500 mb-2 text-lg">{offer.description}</p>
                  <p className="text-green-700 font-semibold text-md mb-1.5">Precio con descuento: ${offer.discountPrice}</p>
                  <p className="text-red-500 font-semibold text-md mb-1.5">Precio original: ${offer.originalPrice}</p>
                  <p className="text-sm text-blue-900 font-semibold mb-1.5 uppercase">Estado: {offer.offerState}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};