import React from "react";
import {
  FaChartLine,
  FaDollarSign,
  FaUserCog,
  FaBookOpen,
  FaPiggyBank,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";
import LandingpageHeader from "./LandingpageHeader";
import { useNavigate } from "react-router-dom";

const features = [
  {
    id: "microinvesting",
    icon: <FaDollarSign className="text-5xl text-primary-500" />,
    title: "Micro-investments",
    description:
      "Start investing with as little as ₹29. Grow your wealth over time with minimal risk.",
  },
  {
    id: "banking",
    icon: <FaUserCog className="text-5xl text-primary-500" />,
    title: "Personalized Recommendations",
    description:
      "Receive investment recommendations tailored to your financial goals and risk tolerance.",
  },
  {
    id: "earning",
    icon: <FaChartLine className="text-5xl text-primary-500" />,
    title: "Virtual Portfolio",
    description:
      "Track and manage your investments with a comprehensive virtual portfolio.",
  },
  {
    id: "learning",
    icon: <FaBookOpen className="text-5xl text-primary-500" />,
    title: "Educational Content",
    description:
      "Access resources and guides to enhance your investment knowledge and skills.",
  },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const LandingPage = () => {
  const navigate = useNavigate();
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <>
      <LandingpageHeader onScrollToSection={handleScrollToSection} />
      <div className="bg-white">
        <section className="relative bg-primary-50 py-20 md:py-28">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold text-primary-900 mb-4">
                Start Investing with Just $1
              </h1>
              <p className="text-text-secondary mb-6 text-lg">
                Take the first step towards your financial freedom by starting
                small and growing big. Join our community of smart investors.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="bg-primary-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-primary-600 transition duration-300"
              >
                Start Your Investment Journey
              </button>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="flex items-center justify-center bg-primary-100 p-8 rounded-full shadow-lg">
                <FaChartLine className="text-primary-500 text-8xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary-100 py-20 text-center" id="features">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-primary-900 mb-6">
              Explore Our Services
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Discover how we can help you achieve your financial goals with our
              comprehensive services.
            </p>

            <div className="flex justify-center space-x-6 overflow-x-auto ">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-lg shadow-lg w-80 cursor-pointer hover:bg-primary-200 transition duration-300 transform hover:scale-105"
                  onClick={() => handleScrollToSection(feature.id)}
                >
                  <div className="flex justify-center mb-4 text-primary-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 text-center mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section for MicroInvesting */}
        <section id="microinvesting" className="py-20 bg-white">
          <div className="container mx-auto px-4 flex items-start justify-start ">
            <FaPiggyBank className="text-5xl text-primary-500 mr-6 justify-start" />
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-4 justify-start">
                MicroInvesting
              </h2>
              <p className="text-lg text-text-secondary justify-between">
                MicroInvesting allows you to start investing with a very small
                amount of money, such as $1. It's an excellent way to begin
                capital. Over time, you can watch your investments grow with
                minimal risk.
              </p>
            </div>
          </div>
        </section>

        {/* Section for Banking */}
        <section id="banking" className="py-20 bg-primary-50">
          <div className="container mx-auto px-4 flex items-start">
            <FaShieldAlt className="text-6xl text-primary-500 mr-6" />
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-4">
                Banking
              </h2>
              <p className="text-lg text-text-secondary">
                Our banking solutions offer a range of financial services
                designed to manage your money efficiently. Enjoy features such
                as secure transactions, easy account management, and tailored
                financial advice to meet your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Section for Earning */}
        <section id="earning" className="py-20 bg-white">
          <div className="container mx-auto px-4 flex items-start">
            <FaLightbulb className="text-6xl text-primary-500 mr-6" />
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-4">
                Earning
              </h2>
              <p className="text-lg text-text-secondary">
                Discover various ways to maximize your earnings through smart
                investment strategies and opportunities. Whether you want to
                enhance your income or explore new earning avenues, our platform
                has the tools to help you succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Section for Learning */}
        <section id="learning" className="py-20 bg-primary-50">
          <div className="container mx-auto px-4 flex items-start">
            <FaBookOpen className="text-6xl text-primary-500 mr-6" />
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-4">
                Learning
              </h2>
              <p className="text-lg text-text-secondary">
                Access a wide range of resources designed to improve your
                financial literacy. From articles to interactive courses, we
                provide everything you need to become a more informed investor.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
