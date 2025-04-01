import React, { useEffect } from 'react'
import { BASE_ADMIN_URL } from '../api/api';
import OfferCard from './OfferCard';

const OfferList = () => {

    const [coupons, setCoupons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            // fetch coupons from the API
            const res = await fetch(BASE_ADMIN_URL + "/offers", {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await res.json();
            console.log(data);
            
            if (res.ok) {
                setCoupons(data.offers);
                setLoading(false);
                setError(null);
            } else {
                console.error('Error fetching coupons:', data.message);
                setError(data.message);
            }
        }

        fetchOffers();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">La Cuponera | Admin Dashboard</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                <ul className="list-disc pl-5">
                    {coupons.map((coupon) => (
                        <OfferCard key={coupon.id} title={coupon.title} state={coupon.state} description={coupon.description} originalPrice={coupon.originalPrice} discountPrice={coupon.discountPrice} validFrom={coupon.validFrom} validUntil={coupon.validUntil}/>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default OfferList