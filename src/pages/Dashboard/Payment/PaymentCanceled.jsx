import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
  return (
    <div>
      <h2>Payment is canceled. Please try again.</h2>
      <Link to='/dashboard/myParcels'>
      <button className='btn btn-primary text-black'>Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCanceled;