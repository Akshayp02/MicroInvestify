import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDollarSign,
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import PaymentService from "./Service/PaymentService";
import InvestmentService from "./Service/InvestmentService";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [fund, setFund] = useState(0);
  const [defaultData, setDefaultData] = useState([]);
  const username = localStorage.getItem("username");
  const [Myreturn, setMyreturn] = useState(0);
  const [muInv, setmuInv] = useState(0);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const response = await InvestmentService.portfolio(username);
        console.log("Fetched portfolio data:", response.data);
        const formattedData = response.data.map((item) => ({
          investmentAsset: item.investmentAsset,
          investmentPrice: item.investmentPrice,
          currentPrice: item.currentPrice,
          returns: item.returns,
        }));

        const returnsMyreturn = formattedData.reduce((acc, item) => {
          return acc + item.returns;
        }, 0);
        const retunINV = formattedData.reduce((acc, item) => {
          return acc + item.investmentPrice;
        }, 0);
        setmuInv(retunINV);
        setMyreturn(returnsMyreturn);
        setDefaultData(formattedData);
      } catch (error) {
        console.log("Error fetching portfolio:", error.message);
        alert(
          error.message || "An error occurred while fetching your portfolio."
        );
      }
    };

    if (username) {
      getPortfolio();
    }
  }, [username]);

  useEffect(() => {
    const fetchFund = async (username) => {
      try {
        const response = await PaymentService.getFunds(username);
        console.log("Total Funds:", response.data);
        setFund(response.data); // Update the fund state
      } catch (e) {
        console.log(e);
      }
    };

    const username = localStorage.getItem("username");
    if (username) {
      fetchFund(username);
    }
  }, []);


  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Performance",
        data: [1000, 1500, 1200, 1800, 1700, 1900],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <NavBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* Card 1: Current Balance */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaDollarSign className="text-3xl text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Current Balance</h3>
              <p className="text-gray-600">${fund}</p>{" "}
              {/* Display fund value */}
            </div>
          </div>

          {/* Card 2: Total Investments */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaMoneyBillWave className="text-3xl text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">Total Investments</h3>
              <p className="text-gray-600">${muInv}</p>
            </div>
          </div>

          {/* Card 3: Returns */}

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaChartLine className="text-3xl text-yellow-500" />

            <div>
              <h3 className="text-xl font-semibold">Returns</h3>
              <p className="text-gray-600">${Myreturn}</p>
            </div>
          </div>

          {/* Card 4: Available Cash */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaWallet className="text-3xl text-red-500" />
            <div>
              <h3 className="text-xl font-semibold">Available Cash</h3>
              <p className="text-gray-600">$ {fund}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Performance */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Portfolio Performance
            </h3>
            <Line data={data} />
          </div>

          {/* Recent Transactions */}

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Buy: </span>
                <span className="text-green-500">+$0.0</span>
              </li>
              <li className="flex justify-between">
                <span>Sell: </span>
                <span className="text-red-500">-$0.0</span>
              </li>
              <li className="flex justify-between">
                <span>Deposit</span>
                <span className="text-green-500">+${fund} </span>
              </li>
              {/* Add more transactions as needed */}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-600">
            <FaArrowUp />
            <span>Invest Now</span>
          </button>
          <button
            onClick={() => navigate("/my-portfolio")}
            className="bg-red-500 text-white p-4 rounded-lg shadow-md flex items-center space-x-2 hover:bg-red-600"
          >
            <FaArrowDown />
            <span>Withdraw Funds</span>
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center space-x-2 hover:bg-green-600"
          >
            <FaPlus />
            <span>Add Funds</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
