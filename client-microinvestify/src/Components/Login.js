import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import authService from "./Service/authService";
import LandingpageHeader from "./LandingpageHeader";

const Login = () => {
  const [logUser, setLogUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogUser({
      ...logUser,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(logUser);
      console.log("Success:", response);
      const username  = response.data;
      localStorage.setItem("username", username);
      navigate("/dashbord");
    } catch (error) {
      console.log("Error:", error);
      // Optionally, you can display an error message to the user
    }

    setLogUser({
      username: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <LandingpageHeader />
      <section className="min-h-screen flex bg-background-light items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto bg-slate-50 shadow border-b">
          <div className="flex flex-col items-center border-b p-6 space-y-4 sm:p-8">
            <h1 className="leading-tight tracking-wider text-text-secondary text-sm font-bold font-sans md:text-2xl dark:text-gray-700">
              Login to Your Account
            </h1>
            <form className="w-full space-y-4" onSubmit={loginUser}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-text-primary dark:text-text-primary"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={logUser.username}
                  onChange={handleChange}
                  id="username"
                  placeholder="name@company.com"
                  className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
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
                    value={logUser.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-background-light border border-secondary-200 text-text-primary text-sm rounded-lg focus:ring-primary-600
                      focus:border-primary-600 dark:bg-background-light dark:border-secondary-300 dark:text-text-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-text-primary"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-green-500 hover:underline dark:text-green-500"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-primary-800"
              >
                Login
              </button>

              <p className="text-sm font-light ">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/register")}
                  className="font-medium text-green-500 hover:underline dark:text-green-600"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
