import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import icon from "../assets/microinvestify_icon.svg";

const NavBar = () => {
  const navigate = useNavigate();

  const onScrollToSection = (section) => {
    console.log(`Scrolling to ${section}`); 
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo on the left */}
          <div className="flex items-center">
          <img className="h-16 w-16" src={icon} alt="MicroInvestify" />
          </div>

          {/* Modern Search Bar */}
          <div className="relative flex-grow max-w-md mx-auto">
            <input
              type="text"
              className="w-full p-2 pl-10 border rounded-full bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSearch className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-end  space-x-10 px-8">
            <div className="relative group">
              <FaUserCircle className="text-2xl text-primary-400 cursor-pointer " />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
