import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin();


  // Public routes (visible to all users)
  const publicRoutes = [
    { path: "/", label: "Home" },
    { path: "/meals", label: "Meals" },
    { path: "/upcoming-meals", label: "Upcoming Meals" },
  ];

  // Protected routes (visible only to logged-in users)
  const protectedRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/rules", label: "Rules" }, // Example dynamic route
  ];

  // Admin-only routes (visible in dropdown for admin users)
  const adminRoutes = [
    { path: "/addfood", label: "Add Food" },
    { path: "/allusers", label: "All Users" },
    { path: "/managefoods", label: "Manage Foods" },
    { path: "/manage-upcoming-foods", label: "Manage Upcoming Foods" },
    { path: "/manage-food-reviews", label: "Manage Food Reviews" },
    { path: "/admin-dashboard", label: "Admin Dashboard" },
    { path: "/serve-meals", label: "Requested Meals" },
  ];

  return (
    <div className="lg:px-44 bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="navbar">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <button
              className="btn-sm btn btn-ghost lg:hidden focus:outline-none"
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
              <ul className="menu menu-lg dropdown-content bg-white text-gray-700 rounded-md z-50 mt-3 w-60 p-2 shadow-lg">
                {publicRoutes.map((route) => (
                  <li key={route.path}>
                    <a href={route.path}>{route.label}</a>
                  </li>
                ))}
                {user &&
                  protectedRoutes.map((route) => (
                    <li key={route.path}>
                      <a href={route.path}>{route.label}</a>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Logo */}
          <a href="/" className="lg:text-2xl font-semibold text-gray-800 hover:text-gray-600 transition-all tracking-wide">
            RUET Hostel
          </a>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 space-x-8 text-gray-600 text-base font-medium">
            {publicRoutes.map((route) => (
              <li key={route.path}>
                <a href={route.path} className="hover:text-gray-800 transition">
                  {route.label}
                </a>
              </li>
            ))}
            {user &&
              protectedRoutes.map((route) => (
                <li key={route.path}>
                  <a href={route.path} className="hover:text-gray-800 transition">
                    {route.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="focus:outline-none" aria-label="Notifications">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0" />
            </svg>
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar focus:outline-none">
                <div className="w-8 rounded-full">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </label>
              <ul className="menu menu-lg dropdown-content bg-white text-gray-700 rounded-md z-50 mt-3 w-48 p-2 shadow-lg">
                <li>
                  <span>{user.displayName}</span>
                </li>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                {/* Admin routes dropdown */}
                {isAdmin && (
                  <li>
                    <details>
                      <summary className="hover:text-gray-800">Admin Panel</summary>
                      <ul className="bg-white rounded-md shadow-lg mt-2">
                        {adminRoutes.map((route) => (
                          <li key={route.path}>
                            <a href={route.path} className="block px-4 py-2 text-sm hover:bg-gray-100">
                              {route.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                )}
                <li>
                  <button className="text-left text-gray-600 hover:text-gray-800 w-full" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <a href="/login" className="border-solid border-2 border-gray-800 rounded-full text-black px-4 py-1 hover:bg-gray-700 hover:text-gray-50 transition">
              Join Us
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
