import React, { useEffect, useState } from "react";
import { FaEdit, FaLock, FaBell, FaUser, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Sidebar from "./Sidebar"; 
import NavBar from "./NavBar";
import PaymentService from "./Service/PaymentService"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate(); 
  const [activeSection, setActiveSection] = useState("profile");
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    investmentPreference: "Not Set",
    profilePicture: ""
  });

  useEffect(() => {
    const fetchData = async (username) => {
      if (!username) {
        console.error("Username is undefined");
        return;
      }
      try {
        const response = await PaymentService.getuser(username);
        console.log("Fetched user data:", response.data);
        setUserProfile({
          firstName: response.data.firstName || "John",
          lastName: response.data.lastName || "Doe",
          email: response.data.email || "john.doe@example.com",
          investmentPreference: response.data.investmentPreference || "Not Set",
          profilePicture: response.data.profilePicture || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    const storedUsername = localStorage.getItem("username");
    console.log("Stored Username:", storedUsername);
    if (storedUsername) {
      fetchData(storedUsername);
    } else {
      console.error("No username found in localStorage");
    }
  }, []);
  

  const handleLogout = async () => {
    try {
      localStorage.removeItem('username');
      console.log('Redirecting to login page...');
      navigate('/login');
      const response = await axios.post('http://localhost:8080/api/users/logout', {}, {
        withCredentials: true,
      });
  
      if (response.status !== 200) {
        throw new Error('Logout failed');
      }
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="p-6 bg-gray-100 flex-1">
          {/* Settings Navigation */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="flex space-x-4">
              {[{
                id: "profile", icon: <FaUser />, label: "Profile"
              }, {
                id: "security", icon: <FaLock />, label: "Security"
              }, {
                id: "notifications", icon: <FaBell />, label: "Notifications"
              }, {
                id: "preferences", icon: <FaEdit />, label: "Preferences"
              }
              ].map((section) => (
                <button
                  key={section.id}
                  className={`px-4 py-2 rounded-lg ${
                    activeSection === section.id
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200"
                  } flex items-center space-x-2`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon} {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {activeSection === "profile" && (
              <>
                <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                <div className="flex items-center space-x-4 mb-6">
                  {userProfile.profilePicture ? (
                    <img
                      src={userProfile.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="w-24 h-24 text-gray-400" />
                  )}
                  <div>
                    <p className="text-lg font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <p className="text-gray-600">
                      Investment Preferences: {userProfile.investmentPreference}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Edit Profile Button */}
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 flex items-center space-x-2">
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}

            {activeSection === "security" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p>Change Password</p>
                    <button className="text-blue-500 hover:underline">Change</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Two-Factor Authentication</p>
                    <button className="text-blue-500 hover:underline">Enable</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Manage Connected Accounts</p>
                    <button className="text-blue-500 hover:underline">Manage</button>
                  </div>
                </div>
              </>
            )}

            {activeSection === "notifications" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p>Email Notifications</p>
                    <input type="checkbox" checked={true} className="form-checkbox" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Push Notifications</p>
                    <input type="checkbox" checked={false} className="form-checkbox" />
                  </div>
                </div>
              </>
            )}

            {activeSection === "preferences" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Investment Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 mb-2">Risk Appetite</label>
                    <select className="form-select w-full">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">Preferred Asset Classes</label>
                    <select multiple className="form-select w-full">
                      <option>Stocks</option>
                      <option>Bonds</option>
                      <option>Crypto</option>
                      <option>ETFs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">Investment Frequency</label>
                    <select className="form-select w-full">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
