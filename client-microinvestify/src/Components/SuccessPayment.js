import React from "react";


const SuccessPayment = () => {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-green-600">Payment Successful</h1>
        <p className="text-gray-600 mt-4">Your payment has been processed successfully.</p>
        <div className="mt-6">
          <button
       
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Go to Home
          </button>
          <button
          
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
