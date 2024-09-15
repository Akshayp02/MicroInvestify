import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import Stockservice from "./Service/Stockservice";

const LiveMarketData = () => {
  const [sensexData, setSensexData] = useState(null);
  const [bitcoinData, setBitcoinData] = useState(null);

  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  useEffect(() => {
    const fetchTopGainersAndLosers = async () => {
      try {
        const response = await Stockservice.getTopGAINERS_LOSERS();
        const { top_gainers, top_losers } = response.data;
        const topFiveGainers = top_gainers.slice(0, 4);
        const topFiveLosers = top_losers.slice(0, 4);

        // Update the state with top 5 gainers and top 5 losers
        setTopGainers(topFiveGainers.map((stock) => ({
          name: stock.ticker,
          change: stock.change_percentage,
        })));
        setTopLosers(topFiveLosers.map((stock) => ({
          name: stock.ticker,
          change: stock.change_percentage,
        })));
      } catch (error) {
        console.error("Error fetching stock data", error);
      }
    };

    fetchTopGainersAndLosers(); // Call the fetch function
  }, []);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price Trend",
        data: [150, 160, 145, 170, 180, 190],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="p-6 bg-gray-100 flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Live Market Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* SENSEX Data */}
              {sensexData ? (
                <div className="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">SENSEX</span>
                    <span className="text-gray-600">₹{sensexData.price}</span>
                  </div>
                  <div className="text-green-500">{sensexData.time}</div>
                </div>
              ) : (
                <p className="text-gray-600">Loading SENSEX data...</p>
              )}

              {/* Bitcoin Data */}
              {bitcoinData ? (
                <div className="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">Bitcoin</span>
                    <span className="text-gray-600">${bitcoinData.price}</span>
                  </div>
                  <div className="text-green-500">{bitcoinData.time}</div>
                </div>
              ) : (
                <p className="text-gray-600">Loading Bitcoin data...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Top Gainers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topGainers.length > 0 ? (
                topGainers.map((gainer, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{gainer.name}</h3>
                      <p className="text-green-500">{gainer.change}</p>
                    </div>
                    <div className="text-xl">
                      <FaArrowUp className="text-green-500" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Loading top gainers...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Losers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topLosers.length > 0 ? (
                topLosers.map((loser, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{loser.name}</h3>
                      <p className="text-red-500">{loser.change}</p>
                    </div>
                    <div className="text-xl">
                      <FaArrowDown className="text-red-500" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Loading top losers...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Detailed Charts and Analysis</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Price Trend (Line Chart)</h3>
              <Line data={chartData} />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Advanced Analysis Tools</h3>
              <p className="text-gray-600">Moving Averages, Trend Lines, etc. will be implemented here...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveMarketData;
