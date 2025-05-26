const fetchCouponRedeem = ({couponCode, DUI})=>{
    fetch(`http://localhost:3000/api/v1/coupons/${couponCode}/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MDQzMDMsImV4cCI6MTc0MzgyNTkwM30.iftB33uxx2rrT95gb9tl3bIm481GSiM7p-8pea0mfbY'
        },
        body: JSON.stringify({ DUI })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al redimir el cupón:', error);
        });
}

export default fetchCouponRedeem;