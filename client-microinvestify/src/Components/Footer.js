import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-primary-400">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms-of-service" className="hover:text-primary-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-primary-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-primary-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-primary-300">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-primary-300">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-primary-300">
                <FaLinkedinIn className="text-2xl" />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-primary-300">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-400">Contact Information</h3>
            <p className="mb-2">Email: <a href="akshaypeherkar2002@gmail.com" className="hover:text-primary-300">info@yourcompany.com</a></p>
          
            <p>Address: @INDIA</p>
          </div>
        </div>
      </div>
      <div className="bg-primary-800 py-4 mt-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-200 text-sm">&copy; {new Date().getFullYear()} MicroInvestify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
