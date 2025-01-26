import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="navbar bg-white shadow-md border-b border-gray-200">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-md z-50 mt-3 w-48 p-2 shadow-lg"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/meals">Meals</a>
              </li>
              <li>
                <a href="/upcoming-meals">Upcoming Meals</a>
              </li>
            </ul>
          )}
        </div>

        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition-all tracking-wide"
        >
          RUET Hall
        </a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 space-x-8 text-gray-600 text-base font-medium">
          <li>
            <a href="/" className="hover:text-gray-800 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/meals" className="hover:text-gray-800 transition">
              Meals
            </a>
          </li>
          <li>
            <a href="/upcoming-meals" className="hover:text-gray-800 transition">
              Upcoming Meals
            </a>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Notification Icon */}
        <button
          className="btn btn-ghost focus:outline-none"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
            />
          </svg>
        </button>

        {/* User Profile or Login */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 rounded-full">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </label>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-md z-50 mt-3 w-48 p-2 shadow-lg"
              >
                <li>
                  <span>{user.displayName}</span>
                </li>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                  <button
                    className="text-left text-gray-600 hover:text-gray-800 w-full"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <a
            href="/login"
            className="btn bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Join Us
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
