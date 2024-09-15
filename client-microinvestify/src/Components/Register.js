import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import authService from "./Service/authService";
import LandingpageHeader from "./LandingpageHeader";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    try {
      authService
        .registerUser(user)
        .then((response) => {
          console.log("Server Response:", response);
          navigate("/login");
        })
        .catch((error) => {
          console.log("Error:", error);
          console.log("Error Details:", error.response?.data);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  
    // Correct way to reset the state
    setUser({
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword((prevState) => !prevState);
    } else {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

  return (
    <>
    <LandingpageHeader />
      <section className="min-h-screen flex bg-background-light items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-slate-50 rounded-sm dark:bg-slate-50 dark:border mx-auto shadow border-b">
          <div className="flex flex-col items-center p-6 space-y-4 sm:p-8">
            <h1 className="leading-tight tracking-wide text-text-secondary text-sm font-bold font-sans md:text-2xl dark:text-gray-700">
              Create an account
            </h1>
            <form className="w-full space-y-4" onSubmit={saveUser}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-text-secondary dark:text-text-primary"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username" 
                  id="username"
                  value={user.username} 
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your username"
                  className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={user.firstName}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your first name"
                  className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={user.lastName}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your last name"
                  className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="name@company.com"
                  className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-text-primary"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={user.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-text-primary"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-secondary-200 rounded bg-background-light focus:ring-3 focus:ring-primary-300 dark:bg-background-dark dark:border-secondary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-text-secondary dark:text-primary"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline hover:text-primary-700 dark:text-primary"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-green-500 dark:hover:bg-green-00 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-text-secondary dark:text-secondary">
                Already have an account?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="font-medium hover:cursor-pointer text-primary-500 hover:underline hover:text-primary-600 dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
