import React from "react";
import { useNavigate } from "react-router-dom";
 

const CancelPayment = () => {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-yellow-600">Payment Cancelled</h1>
        <p className="text-gray-600 mt-4">Your payment has been cancelled. Please try again.</p>
        <div className="mt-6">
          <button
          onClick={() => navigate("/dashbord")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
