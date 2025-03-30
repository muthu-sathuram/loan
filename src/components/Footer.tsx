
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-loan-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-xl font-bold">Srinivasan Associates</span>
            </div>
            <p className="text-gray-300 text-sm">
              Making home loans easy and accessible for everyone with transparent, 
              hassle-free financing solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-loan-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-loan-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-loan-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-loan-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-white transition-colors">
                  Loan Products
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Loan Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Loan Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-white transition-colors">
                  Home Loans
                </Link>
              </li>
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-white transition-colors">
                  Refinance Loans
                </Link>
              </li>
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-white transition-colors">
                  Investment Loans
                </Link>
              </li>
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-white transition-colors">
                  First Home Buyer
                </Link>
              </li>
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-white transition-colors">
                  Construction Loans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-loan-secondary mt-0.5" />
                <span className="text-gray-300">123 Finance Street, Mortgage City, MC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-loan-secondary" />
                <span className="text-gray-300">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-loan-secondary" />
                <span className="text-gray-300">info@homeloans.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Srinivasan Associates. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
