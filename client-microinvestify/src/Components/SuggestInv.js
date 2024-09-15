import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import Stockservice from "./Service/Stockservice";
import InvestmentService from "./Service/InvestmentService";



const SuggestInv = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [returns, setReturns] = useState({});
  const [symbols, setSymbols] = useState(["AAPL"]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [selectedStock, setSelectedStock] = useState({ symbol: "", price: 0 });
  const [recommendations, setRecommendations] = useState([]);

  const [topgainners, setTopgainners] = useState([]);
  const [toplosersData, setToplosersData] = useState([]);
  const [mostTraded, setMostTraded] = useState([]);

  const InvestmentModal = ({ isOpen, onClose, onConfirm, symbol, price }) => {
    const [amount, setAmount] = useState("");

    const handleConfirm = () => {
      onConfirm(amount);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Invest in {symbol}</h3>
          <p className="mb-4">Current Price: {price}</p>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Amount to Invest:
            </label>
            <input
              type="number"
              className="border rounded-lg p-2 w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary-500 text-white px-4 py-2 rounded-lg"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchTopGainersAndLosers = async () => {
      try {
        const response = await Stockservice.getTopGAINERS_LOSERS();
        const { top_gainers, top_losers, most_actively_traded } = response.data;

        const topFiveGainers = top_gainers.slice(0, 6);
        const topFiveLosers = top_losers.slice(0, 6);
        const mostTraded = most_actively_traded.slice(0, 4);

        setTopgainners(
          topFiveGainers.map((stock) => ({
            name: stock.ticker,
            changeper: stock.change_percentage,
            type: "Top Gainer",
            price: stock.price,
            change: stock.change_amount,
          }))
        );

        setToplosersData(
          topFiveLosers.map((stock) => ({
            name: stock.ticker,
            changeper: stock.change_percentage,
            type: "Top Loser",
            price: stock.price,
            change: stock.change_amount,
          }))
        );

        setMostTraded(
          mostTraded.map((stock) => ({
            name: stock.ticker,
            change: stock.change_amount,
            price: stock.price,
            percent: stock.change_percentage,
          }))
        );
      } catch (error) {
        console.error("Error fetching stock data", error);
      }
    };

    fetchTopGainersAndLosers();
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const requests = symbols.map((symbol) =>
          Stockservice.getHistoricalOptions(symbol)
        );
        const responses = await Promise.all(requests);

        const allData = responses.map((response) => response.data.data);
        setHistoricalData(allData);

        const meanReturns = calculateMeanReturns(allData);
        const calculatedReturns =
          Stockservice.calculateTotalReturns(meanReturns);

        setReturns(calculatedReturns);
      } catch (error) {
        console.error("Error fetching historical options data", error);
      }
    };

    fetchHistoricalData();
  }, [symbols]);
  const username = localStorage.getItem("username");


const handleBuy = async (symbol, price, amount) => {
  try {
    const response = await InvestmentService.invest(
      username,
      amount,
      symbol,
      price
    );
    console.log(response.data); 
    alert(`Successfully bought ${symbol} at ${price} with amount ${amount}`);
  } catch (error) {
    console.error("Error performing buy action:", error.message);
    alert(error.message || 'An error occurred while processing your request.');
  }
};

  
  const openModal = (symbol, price) => {
    setSelectedStock({ symbol, price });
    setIsModalOpen(true);
  };
  
  const handleConfirmInvestment = (amount) => {
    handleBuy(selectedStock.symbol, selectedStock.price, amount);
    setIsModalOpen(false);
  };
  

  const calculateStandardDeviation = (data) => {
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;
    return Math.sqrt(variance);
  };

  const getRiskLevel = (stdDev) => {
    if (stdDev < 1) return "Low";
    if (stdDev < 2) return "High";
    return "Very High";
  };

  const calculateMeanReturns = (data) => {
    const meanReturns = {};
    const risks = {
      weekly: {},
      monthly: {},
      yearly: {},
    };
    const riskLevels = {
      weekly: {},
      monthly: {},
      yearly: {},
    };

    data.forEach((symbolData) => {
      symbolData.forEach((option) => {
        if (!meanReturns[option.symbol]) {
          meanReturns[option.symbol] = {
            total: 0,
            count: 0,
            prices: [],
          };
        }
        meanReturns[option.symbol].total += parseFloat(option.last);
        meanReturns[option.symbol].count += 1;
        meanReturns[option.symbol].prices.push(parseFloat(option.last));
      });
    });

    for (const symbol in meanReturns) {
      const { total, count, prices } = meanReturns[symbol];
      const averagePrice = total / count;

      const basePrice = 100;
      const percentageReturn = ((averagePrice - basePrice) / basePrice) * 100;
      meanReturns[symbol] = percentageReturn.toFixed(2);

      const weeklyStdDev = calculateStandardDeviation(prices) * Math.sqrt(5);
      const monthlyStdDev = calculateStandardDeviation(prices) * Math.sqrt(22);
      const yearlyStdDev = calculateStandardDeviation(prices) * Math.sqrt(252);

      risks.weekly[symbol] = weeklyStdDev.toFixed(2);
      risks.monthly[symbol] = monthlyStdDev.toFixed(2);
      risks.yearly[symbol] = yearlyStdDev.toFixed(2);

      riskLevels.weekly[symbol] = getRiskLevel(weeklyStdDev);
      riskLevels.monthly[symbol] = getRiskLevel(monthlyStdDev);
      riskLevels.yearly[symbol] = getRiskLevel(yearlyStdDev);
    }

    setRecommendations(
      Object.keys(meanReturns).map((symbol) => ({
        name: symbol,
        returns: meanReturns[symbol],
        risk: riskLevels.yearly[symbol],
      }))
    );
    return { meanReturns, risks, riskLevels };
  };

  const handleSell = (name, price) => {
   
    console.log(`Selling ${name} at ${price}`);
   
  };

  const newsFeed = [
    { title: "How to diversify your portfolio", link: "#", id: 1 },
    { title: "Top 10 investment tips for 2024", link: "#", id: 2 },
    { title: "Understanding market volatility", link: "#", id: 3 },
  ];

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <h2 className="text-3xl font-bold mb-6">
            Investment Recommendations
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Most Actively Traded</h2>
            <div className="space-y-4">
              {mostTraded.map((stock, index) => {
                const isGainer = stock.change > 0; // Assuming positive change indicates a gainer
                return (
                  <div
                    key={index}
                    className="p-4 border-b border-gray-200 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {stock.name}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Change:{" "}
                        <span
                          className={`font-semibold ${
                            isGainer ? "text-green-500" : "text-red-700"
                          }`}
                        >
                          {stock.change}
                        </span>{" "}
                        (
                        <span
                          className={`font-semibold ${
                            isGainer ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stock.percent}%
                        </span>
                        )
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(stock.name, stock.price)}
                        className={`px-4 py-2 rounded-lg shadow text-white transition w-32 ${
                          isGainer
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        Invest
                      </button>
                      <button
                        onClick={() => handleSell(stock.name, stock.price)}
                        className={`px-4 py-2 rounded-lg shadow text-white transition w-32 ${
                          isGainer
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Top Gainers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topgainners.map((stock, index) => (
                <div
                  key={index}
                  className="border border-white p-5 rounded-lg shadow-lg bg-white"
                >
                  <p className="text-xl font-semibold text-gray-700">
                    {stock.name}
                  </p>
                  <p className="text-gray-700 mt-2">
                    Change:{" "}
                    <span className="font-normal text-primary-500">
                      {stock.change}
                    </span>{" "}
                    (
                    <span className="font-semibold text-primary-600">
                      {stock.changeper}
                    </span>
                    )
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <button
                        onClick={() => openModal(stock.name, stock.price)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition w-full"
                      >
                        Invest
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSell(stock.name, stock.price)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition w-full"
                      >
                        Sell
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Top Losers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {toplosersData.map((stock, index) => (
                <div
                  key={index}
                  className="border border-white  p-5 rounded-lg shadow-lg bg-white"
                >
                  <p className="text-xl font-semibold text-gray-700">
                    {stock.name}
                  </p>
                  <p className="text-gray-700 mt-2">
                    Change:{" "}
                    <span className="font-normal text-primary-500">
                      {stock.change}
                    </span>{" "}
                    (
                    <span className="font-mono text-primary-600">
                      {stock.changeper}%
                    </span>
                    )
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <button
                        onClick={() => openModal(stock.name, stock.price)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition w-full"
                      >
                        Invest
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSell(stock.name, stock.price)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition w-full"
                      >
                        Sell
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

  

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Investment News</h3>
            <ul className="list-disc pl-5 space-y-2">
              {newsFeed.map((news) => (
                <li key={news.id} className="text-blue-600 hover:underline">
                  <a href={news.link} target="_blank" rel="noopener noreferrer">
                    {news.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <InvestmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmInvestment}
            symbol={selectedStock.symbol}
            price={selectedStock.price}
          />
        </div>
      </div>
    </>
  );
};

export default SuggestInv;
