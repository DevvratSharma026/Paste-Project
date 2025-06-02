import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText } from 'react-icons/fi';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FiHome className="mr-2" />
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FiFileText className="mr-2" />
            Pastes
          </NavLink>
        </div>

        {/* You could add user profile or other nav items here */}
       
      </div>
    </nav>
  );
};

export default NavBar;