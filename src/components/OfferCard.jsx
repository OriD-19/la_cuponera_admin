import React from 'react'

const OfferCard = ({ title, state, description, originalPrice, discountPrice, validFrom, validUntil}) => {
  return (
    <>
        <li className="mb-4 p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-700">{description}</p>
            <p className="text-gray-500">State: {state}</p>
            <p className="text-gray-500">Original Price: ${originalPrice}</p>
            <p className="text-gray-500">Discount Price: ${discountPrice}</p>
            <p className="text-gray-500">Valid From: {validFrom}</p>
            <p className="text-gray-500">Valid Until: {validUntil}</p>
        </li>
    </>
  )
}

export default OfferCard