
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Calculator, Phone, Info, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-loan-primary" />
            <span className="text-xl font-bold text-loan-primary">Srinivasan Associates</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-loan-primary flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/loans" className="text-gray-700 hover:text-loan-primary">Loan Products</Link>
            <Link to="/calculator" className="text-gray-700 hover:text-loan-primary flex items-center space-x-1">
              <Calculator className="h-4 w-4" />
              <span>Calculator</span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-loan-primary flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-loan-primary flex items-center space-x-1">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" className="border-loan-primary text-loan-primary hover:bg-loan-primary hover:text-white">
                  Admin Panel
                </Button>
              </Link>
            )}
            
            {currentUser ? (
              <Button 
                variant="ghost" 
                className="text-loan-primary hover:bg-loan-light"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            ) : (
              <Link to="/admin-login">
                <Button variant="ghost" className="text-loan-primary hover:bg-loan-light">Admin Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-loan-primary" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/loans" className="block py-2 text-gray-700 hover:text-loan-primary" onClick={closeMenu}>
              Loan Products
            </Link>
            <Link to="/calculator" className="block py-2 text-gray-700 hover:text-loan-primary" onClick={closeMenu}>
              Calculator
            </Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-loan-primary" onClick={closeMenu}>
              Contact
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-loan-primary" onClick={closeMenu}>
              About
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="block py-2 text-loan-primary font-medium" onClick={closeMenu}>
                Admin Panel
              </Link>
            )}
            
            {currentUser ? (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-loan-primary hover:bg-loan-light"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Log Out
              </Button>
            ) : (
              <Link to="/admin-login" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-loan-primary hover:bg-loan-light">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
