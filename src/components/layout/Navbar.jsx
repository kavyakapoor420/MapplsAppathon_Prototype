import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();
  const location = useLocation();
  
  // Mock authentication state - will be replaced with actual auth later
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sticky top-0 z-40 bg-white shadow-md transition-all duration-300 
                    dark:bg-dark-200 dark:border-b dark:border-dark-100 ${isOpen ? 'pb-2' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary-600 font-bold text-xl transition-all duration-300 hover:scale-105 dark:text-primary-400">
                <span className="gradient-text">NGO Events</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300
                          ${location.pathname === '/' 
                            ? 'border-primary-500 text-gray-900 dark:text-white dark:border-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500'}`}
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300
                          ${location.pathname === '/events' 
                            ? 'border-primary-500 text-gray-900 dark:text-white dark:border-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500'}`}
              >
                Events
              </Link>
              <Link 
                to="/map" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300
                          ${location.pathname === '/map' 
                            ? 'border-primary-500 text-gray-900 dark:text-white dark:border-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500'}`}
              >
                Map
              </Link>
              <Link 
                to="/traffic-route-management" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300
                          ${location.pathname === '/map' 
                            ? 'border-primary-500 text-gray-900 dark:text-white dark:border-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500'}`}
              >
                Traffic Route Management
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/dashboard" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300
                            ${location.pathname === '/dashboard' 
                              ? 'border-primary-500 text-gray-900 dark:text-white dark:border-primary-400' 
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500'}`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
                  Profile
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="btn btn-outline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500
                        dark:text-gray-300 dark:hover:text-white dark:hover:bg-dark-100 dark:focus:ring-primary-400 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div 
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300
                      ${location.pathname === '/' 
                        ? 'border-primary-500 text-primary-700 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300' 
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300
                      ${location.pathname === '/events' 
                        ? 'border-primary-500 text-primary-700 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300' 
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white'}`}
          >
            Events
          </Link>
          <Link 
            to="/map" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300
                      ${location.pathname === '/map' 
                        ? 'border-primary-500 text-primary-700 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300' 
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white'}`}
          >
            Map
          </Link>
          {isLoggedIn && (
            <Link 
              to="/dashboard" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300
                        ${location.pathname === '/dashboard' 
                          ? 'border-primary-500 text-primary-700 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300' 
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white'}`}
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-dark-100">
          {isLoggedIn ? (
            <div className="space-y-1">
              <Link 
                to="/profile" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white transition-colors duration-300"
              >
                Profile
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link 
                to="/login" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark-100 dark:hover:text-white transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 