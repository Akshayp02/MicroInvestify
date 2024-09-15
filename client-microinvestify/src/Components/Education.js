import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar'; 
import NavBar from './NavBar';   

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Education = () => {
  // Sample data for progress tracker (optional)
  const progressData = {
    labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4'],
    datasets: [{
      label: 'Completion Progress',
      data: [50, 80, 30, 90],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.1,
    }],
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="p-6 bg-gray-100 flex-1">
          {/* Learning Modules */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Learning Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example module cards */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Investing Basics</h3>
                <p className="text-gray-600 mb-2">Introduction to investing, key concepts, and terminology.</p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:underline">Read Article</a>
                  <a href="#" className="text-blue-500 hover:underline">Watch Video</a>
                  <a href="#" className="text-blue-500 hover:underline">Take Quiz</a>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
                <p className="text-gray-600 mb-2">Learn how to assess and manage investment risks.</p>
                <div className="flex space-x-2">
                  <a href="#" className="text-blue-500 hover:underline">Read Article</a>
                  <a href="#" className="text-blue-500 hover:underline">Watch Video</a>
                  <a href="#" className="text-blue-500 hover:underline">Take Quiz</a>
                </div>
              </div>
              {/* Add more modules as needed */}
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Progress Tracker</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Completion Progress</h3>
              {/* Optional: Include a progress chart */}
              <Line data={progressData} />
              <ul className="mt-4">
                <li className="flex justify-between mb-2">
                  <span>Module 1</span>
                  <span>50% Completed</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>Module 2</span>
                  <span>80% Completed</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>Module 3</span>
                  <span>30% Completed</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>Module 4</span>
                  <span>90% Completed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Featured Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Featured Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example featured content cards */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">New Investment Strategies</h3>
                <p className="text-gray-600 mb-2">Explore the latest trends and strategies in investment.</p>
                <a href="#" className="text-blue-500 hover:underline">Read More</a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Market Analysis Insights</h3>
                <p className="text-gray-600 mb-2">In-depth analysis of current market conditions.</p>
                <a href="#" className="text-blue-500 hover:underline">Read More</a>
              </div>
              {/* Add more featured content as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
