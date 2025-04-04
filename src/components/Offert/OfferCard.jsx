const OfferCard = ({ offer }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg w-80 bg-gray-100 ">
      <h2 className="text-xl font-bold text-center capitalize mb-2">{offer.title}</h2>
      <p className="text-gray-500 mb-2 text-lg">{offer.description}</p>
      <p className="text-green-700 font-semibold text-md mb-1.5">Precio con descuento: ${offer.discountPrice}</p>
      <p className="text-red-500 font-semibold text-md mb-1.5">Precio original: ${offer.originalPrice}</p>
      <p className="text-sm text-blue-900 font-semibold mb-1.5 uppercase">Estado: {offer.offerState}</p>
    </div>
  );
};

export default OfferCard;