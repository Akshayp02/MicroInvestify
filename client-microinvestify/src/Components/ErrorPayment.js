import React from "react";
 

const ErrorPayment = () => {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-red-600">Payment Error</h1>
        <p className="text-gray-600 mt-4">An error occurred while processing your payment. Please try again later.</p>
        <div className="mt-6">
          <button
           
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Go to Home
          </button>
          <button
        
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPayment;
