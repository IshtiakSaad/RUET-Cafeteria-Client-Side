import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-2xl rounded-xl p-16 text-center max-w-xl w-full">
        <h1 className="text-8xl font-extrabold text-gray-800 leading-tight mb-8">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Oops, this page doesn’t exist.
        </h2>
        <p className="text-lg text-gray-500 mb-6">
          We couldn’t find the page you were looking for. It may have been moved or deleted.
        </p>
        <button
          onClick={handleGoHome}
          className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 rounded-lg shadow-lg transition duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
