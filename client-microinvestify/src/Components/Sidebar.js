import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaLightbulb, FaChartLine, FaBook, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold bg-primary-700">
        Investment Dashboard
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => navigate("/dashbord")} 
              className="flex items-center p-4 hover:bg-primary-700 w-full text-left"
            >
              <FaHome className="mr-3" />
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/my-portfolio")} 
              className="flex items-center p-4 hover:bg-primary-700 w-full text-left"
            >
              <FaBriefcase className="mr-3" />
              My Portfolio
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/suggestions")} 
              className="flex items-center p-4 hover:bg-primary-700 w-full text-left"
            >
              <FaLightbulb className="mr-3" />
              Investment Suggestions
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/trends")} 
              className="flex items-center p-4 hover:bg-primary-700 w-full text-left"
            >
              <FaChartLine className="mr-3" />
              Market Trends
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/education")} 
              className="flex items-center p-4 hover:bg-primary-700 w-full text-left"
            >
              <FaBook className="mr-3" />
              Education
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/settings")} 
              className="flex items-center p-4 hover:bg-primary-700 w-full text-left"
            >
              <FaCog className="mr-3" />
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
