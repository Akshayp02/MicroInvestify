import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import InvestmentService from './Service/InvestmentService';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const MyPortfolio = () => {
  const [activeTab, setActiveTab] = useState('stocks');
  const [portfolioData, setPortfolioData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const response = await InvestmentService.portfolio(username);
        console.log("Fetched portfolio data:", response.data);
        const formattedData = response.data.map(item => ({
          investmentAsset: item.investmentAsset,
          investmentPrice: item.investmentPrice,
          currentPrice: item.currentPrice,
          returns: item.currentPrice - item.investmentPrice
        }));
        setPortfolioData(formattedData);
        setDefaultData(formattedData); // Update defaultData to match fetched data
      } catch (error) {
        console.error("Error fetching portfolio:", error.message);
        alert(error.message || 'An error occurred while fetching your portfolio.');
      }
    };

    if (username) {
      getPortfolio();
    }
  }, [username]);

  // Filter and organize data
  const assetData = {
    stocks: portfolioData.filter(item => item.investmentAsset === 'Stock'),
    bonds: portfolioData.filter(item => item.investmentAsset === 'Bond'),
    crypto: portfolioData.filter(item => item.investmentAsset === 'Crypto'),
  };

  const getReturnColor = (returns) => {
    return returns >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const handleAction = (action, asset) => {
    console.log(`${action} ${asset.investmentAsset}`, asset);
  };

  const renderAssetData = (assets) => (
    defaultData.length === 0 ? (
      <p className="text-gray-600 text-center py-4">No data available</p>
    ) : (
      defaultData.map((asset, index) => (
        <div key={index} className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{asset.investmentAsset}</h3>
            <p className="text-gray-600">Purchase Price: ${asset.investmentPrice}</p>
            <p className="text-gray-600">Current Price: ${asset.investmentPrice || 'N/A'}</p>
            <p className={`text-${getReturnColor(asset.returns)}`}>Returns: ${asset.returns}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-1"
              onClick={() => handleAction('Buy More', asset)}
            >
              <FaArrowUp /> <span>Buy More</span>
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-1"
              onClick={() => handleAction('Sell', asset)}
            >
              <FaArrowDown /> <span>Sell</span>
            </button>
          </div>
        </div>
      ))
    )
  );

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="p-6 bg-gray-100 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Portfolio Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Asset Allocation Pie Chart */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Asset Allocation</h3>
                  <Pie 
                    data={{
                      labels: ['Stocks', 'ETFs', 'Crypto'],
                      datasets: [{
                        label: 'Asset Allocation',
                        data: [50, 30, 20],
                        backgroundColor: ['#10b981', '#34d399', '#4b7bec'],
                      }],
                    }}
                  />
                </div>
                {/* Returns Line Chart */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Returns</h3>
                  <Line 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [{
                        label: 'Returns',
                        data: [1000, 1200, 1500, 1300, 1700, 1800],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                      }],
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Virtual Portfolio Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Virtual Portfolio</h2>
              <ul className="space-y-4">
                {defaultData.map((holding, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>Stocks</span>
                    <span className="text-gray-600">${holding.investmentPrice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Investment Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
            <div className="flex space-x-2 mb-4">
              <button 
                className={`px-8 py-2 rounded-t-lg ${activeTab === 'stocks' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('stocks')}
              >
                Stocks
              </button>
              <button 
                className={`px-8 py-2 rounded-t-lg ${activeTab === 'bonds' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('bonds')}
              >
                Bonds
              </button>
              <button 
                className={`px-8 py-2 rounded-t-lg ${activeTab === 'crypto' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('crypto')}
              >
                Crypto
              </button>
            </div>

            <div className="border-t border-gray-300">
              {renderAssetData(assetData[activeTab])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPortfolio;
