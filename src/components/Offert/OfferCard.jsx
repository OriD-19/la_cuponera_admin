const OfferCard = ({ offer }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold">{offer.title}</h2>
      <p className="text-gray-600">{offer.description}</p>
      <p className="text-green-500 font-semibold">Precio con descuento: ${offer.discountPrice}</p>
      <p className="text-red-500 line-through">Precio original: ${offer.originalPrice}</p>
      <p className="text-sm text-gray-500">Estado: {offer.offerState}</p>
    </div>
  );
};

export default OfferCard;