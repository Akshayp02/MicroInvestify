import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from "../assets/microinvestify_icon.svg";
const LandingpageHeader = ({ onScrollToSection }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo on the left */}
          <div className="flex items-center">
          <img className="h-16 w-16" src={icon} alt="MicroInvestify" />
          </div>
          
          {/* Navigation links */}
          <div className="hidden md:flex md:space-x-8">
            <a href="#microinvesting" 
            className="text-black hover:text-green-500 font-medium"
             onClick={() => onScrollToSection('microinvesting')}>
              Investing
            </a>
            <a href="#banking" className="text-black hover:text-green-500 font-medium" onClick={() => onScrollToSection('banking')}>
              Banking
            </a>
            <a href="#earning" className="text-black hover:text-green-500 font-medium" onClick={() => onScrollToSection('earning')}>
              Earning
            </a>
            <a href="#learning" className="text-black hover:text-green-500 font-medium" onClick={() => onScrollToSection('learning')}>
              Learning
            </a>
            <a href="#features" className="text-black hover:text-green-500 font-medium" onClick={() => onScrollToSection('features')}>
              Features
            </a>
            <a href="#pricing" className="text-black hover:text-green-500 font-medium" onClick={() => onScrollToSection('pricing')}>
              Pricing
            </a>
          </div>
          
          {/* Login and Get Started button */}
          <div className="flex items-center space-x-4">
            <a
              href="#" 
              onClick={() => navigate('/login')}
              className="text-black hover:text-green-500 font-medium"
            >
              Log in
            </a>
            <a
              href="#" 
              onClick={() => navigate('/register')}
              className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-full px-4 py-2"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingpageHeader;
