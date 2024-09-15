import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaMoneyBillWave, FaPaypal } from 'react-icons/fa';
import Sidebar from './Sidebar'; 
import NavBar from './NavBar'; 
import PaymentService from './Service/PaymentService';
import axios from "axios";

const PaymentDeposit = () => {
  const storedUsername = localStorage.getItem("username");
  const [paymentDetail, setpaymentDetail] = useState({
    amount: '',
    currency: 'USD', 
    method: 'paypal',
    username: storedUsername
  });
  const [formType, setFormType] = useState('deposit');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (storedUsername) {
        try {
          console.log('Fetching payment history for:', storedUsername);
          const response = await PaymentService.getPaymenthistory(storedUsername);
          setTransactions(response.data);
          console.log('Payment history:', response.data);
        } catch (error) {
          console.error('Error fetching payment history:', error);
        }
      }
    };

    fetchPaymentHistory();
  }, [storedUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpaymentDetail({
      ...paymentDetail,
      [name]: value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/payments/create', paymentDetail);
      if (response.data && response.data.startsWith('redirect:')) {
        const redirectUrl = response.data.replace('redirect:', '');
        window.location.href = redirectUrl;
      } else {
        console.log('Error processing payment:');
      }
    } catch (error) {
      console.log('Error processing payment:', error);
      
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="p-6 bg-gray-100 flex-1">
          {/* Payment/Deposit Header */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment/Deposit</h2>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${formType === 'deposit' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setFormType('deposit')}
              >
                <FaDollarSign /> Deposit Funds
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${formType === 'withdrawal' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setFormType('withdrawal')}
              >
                <FaMoneyBillWave /> Withdrawal Requests
              </button>
            </div>
          </div>

          {/* Form and Transaction History */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {formType === 'deposit' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Deposit Funds</h2>
                <form className="space-y-4" onSubmit={handlePayment}>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={paymentDetail.amount}
                      onChange={handleChange}
                      id="amount"
                      placeholder="Enter amount"
                      className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">Payment Method</label>
                    <select
                      name="method"
                      value={paymentDetail.method}
                      onChange={handleChange}
                      className="form-select w-full"
                    >
                      <option value="upi">UPI</option>
                      <option value="netbanking">Net Banking</option>
                      <option value="debitcredit">Debit/Credit Card</option>
                      <option value="paypal">PayPal</option> {/* Default option */}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 flex items-center"
                  >
                    <FaPaypal className="mr-2" /> Pay with PayPal
                  </button>
                </form>
              </>
            )}

            {formType === 'withdrawal' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-600 mb-2">Amount</label>
                    <input type="number" className="form-input w-full" placeholder="Enter amount" />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">Linked Bank Account</label>
                    <input type="text" className="form-input w-full" placeholder="Enter bank account details" />
                  </div>
                  <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600">
                    Request Withdrawal
                  </button>
                </form>
              </>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
              <ul className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <li key={transaction.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                      <div>
                        <p className="text-lg font-semibold">Paypal</p>
                        <p className="text-gray-600">Amount: {transaction.paymentAmount}</p>
                        <p className="text-gray-600">Date: {transaction.paymentDate}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-lg ${
                          transaction.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </li>
                  ))
                ) : (
                  <p>No transactions found.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDeposit;
